import { S3EventRecord } from "aws-lambda";
import { S3 } from "aws-sdk";
import { BadRequestError } from "../../common/errors";
import { environments } from "../../config/environment";
import { Activity } from "../../entities";
import { CourseService } from "../course";
import { DatabaseService } from "../database";
import { CreateActivityDto } from "./dto";

const s3Manager = new S3();

export class ActivityService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly courseService: CourseService
  ) {}

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    const activityRepository = await this.databaseService.getEntityRepository(
      Activity
    );

    const activities = await activityRepository.find({
      where: {
        active: true,
        course: {
          id: courseId,
        },
      },
    });

    await this.databaseService.closeDatabaseConnection();

    return activities;
  }

  private async moveVideoToProcessingBucket(
    activity: Activity
  ): Promise<string> {
    const Key = `${activity.id}.mkv`;
    const CopySource = `${
      environments.S3_FRONTEND_UPLOAD_BUCKET
    }/public${activity.content.replace(
      environments.S3_FRONTEND_UPLOAD_BUCKET,
      ""
    )}`;

    await s3Manager
      .copyObject({
        Bucket: environments.S3_VIDEO_PROCESS_INPUT_BUCKET,
        Key,
        CopySource,
      })
      .promise();

    return Key;
  }

  public async createCourseActivity(
    courseId: string,
    activityPayload: CreateActivityDto
  ): Promise<Activity> {
    const course = await this.courseService.getCourseById(courseId);

    if (!course) {
      throw new BadRequestError("Course not found");
    }

    const activityRepository = await this.databaseService.getEntityRepository(
      Activity
    );

    const activity = new Activity();
    Object.assign(activity, activityPayload);

    activity.course = course;

    const createdActivity = await activityRepository.save(activity);

    try {
      const newContent = await this.moveVideoToProcessingBucket(
        createdActivity
      );

      await activityRepository.save({
        ...createdActivity,
        content: newContent,
      });
    } catch (err) {
      await activityRepository.delete({
        id: createdActivity.id,
      });

      throw new BadRequestError((err as Error).message);
    }

    await this.databaseService.closeDatabaseConnection();

    return createdActivity;
  }

  public activityPosProcessing = async (
    record: S3EventRecord
  ): Promise<boolean> => {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    const params = {
      Bucket: environments.S3_FRONTEND_BUCKET_DEV,
      Key: `protected/${key}`,
      CopySource: `${bucket}/${key}`,
    };
    await s3Manager.copyObject(params).promise();
    await s3Manager
      .copyObject({ ...params, Bucket: environments.S3_FRONTEND_BUCKET_PROD })
      .promise();

    return true;
  };
}
