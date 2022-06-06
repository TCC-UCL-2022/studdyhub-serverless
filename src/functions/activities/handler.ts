import { S3 } from "aws-sdk";
import { S3Handler } from "aws-lambda";
import { activityController } from "../../modules/factory";
import { environments } from "../../config/environment";

export const { createCourseActivity, getCourseActivities } = activityController;

const s3Manager = new S3();

export const activityPosProcessing: S3Handler = async (event) => {
  for (const record of event.Records) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
};
