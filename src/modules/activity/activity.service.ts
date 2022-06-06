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

    // Gamby from here
    try {
      const Key = `${createdActivity.id}.mkv`;
      const CopySource = `${
        environments.S3_FRONTEND_UPLOAD_BUCKET
      }/public${activity.content.replace(
        environments.S3_FRONTEND_UPLOAD_BUCKET,
        ""
      )}`;

      console.log(CopySource);

      await s3Manager
        .copyObject({
          Bucket: environments.S3_VIDEO_PROCESS_INPUT_BUCKET,
          Key,
          CopySource,
        })
        .promise();

      await activityRepository.save({
        ...createdActivity,
        content: Key,
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
}
