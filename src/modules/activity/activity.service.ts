import { S3EventRecord } from "aws-lambda";
import { S3 } from "aws-sdk";
import { BadRequestError } from "../../common/errors";
import { environments } from "../../config/environment";
import { Activity, ActivityModel } from "../../models";
import { CourseService } from "../course";
import { CreateActivityDto } from "./dto";

const s3Manager = new S3();

export class ActivityService {
  constructor(
    private readonly activityModel: typeof ActivityModel,
    private readonly courseService: CourseService
  ) {}

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    const course = await this.courseService.getCourseById(courseId);

    return course.activities;
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
    { content, title, type, description }: CreateActivityDto
  ): Promise<Activity> {
    const course = await this.courseService.getCourseById(courseId);

    const activity = await this.activityModel.create({
      content,
      title,
      type,
      description,
    });

    if (type === "video") {
      try {
        const newContent = await this.moveVideoToProcessingBucket(activity);

        activity.content = newContent;
        await activity.save();
      } catch (err) {
        await activity.delete();

        throw new BadRequestError((err as Error).message);
      }
    }

    course.activities.push(activity);

    await course.save();

    return activity;
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
