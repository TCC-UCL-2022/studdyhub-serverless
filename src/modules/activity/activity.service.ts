import { S3EventRecord } from "aws-lambda";
import { S3 } from "aws-sdk";
import { injectable } from "inversify";
import { ActivityType } from "../../common/enums";
import { BadRequestError } from "../../common/errors";
import { generateUuid } from "../../common/utils";
import { environments } from "../../config/environment";
import { Activity } from "../../models";
import { CourseService } from "../course";
import { DatabaseService } from "../database";
import { UserService } from "../user";
import { CreateActivityDto } from "./dto";

const s3Manager = new S3();

@injectable()
export class ActivityService extends CourseService {
  constructor(userService: UserService, databaseService: DatabaseService) {
    super(userService, databaseService);
  }

  public async getCourseActivities(courseId: string): Promise<Activity[]> {
    const course = await this.getCourseById(courseId);

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
    {
      content,
      title,
      type = ActivityType.VIDEO,
      description,
    }: CreateActivityDto
  ): Promise<Activity> {
    const course = await this.getCourseById(courseId);

    const activity: Activity = {
      id: generateUuid(),
      content,
      title,
      type,
      description,
    };

    if (type === "video") {
      try {
        const newContent = await this.moveVideoToProcessingBucket(activity);

        activity.content = newContent;
      } catch (err) {
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
