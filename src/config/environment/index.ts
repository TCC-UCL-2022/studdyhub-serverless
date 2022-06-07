function getEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }

  return value;
}

export const environments = {
  NODE_ENV: getEnvironmentVariable("NODE_ENV"),
  DB_URL: process.env.DB_URL,
  S3_FRONTEND_UPLOAD_BUCKET: getEnvironmentVariable(
    "S3_FRONTEND_UPLOAD_BUCKET"
  ),
  S3_VIDEO_PROCESS_INPUT_BUCKET: getEnvironmentVariable(
    "S3_VIDEO_PROCESS_INPUT_BUCKET"
  ),
  S3_FRONTEND_BUCKET_DEV: getEnvironmentVariable("S3_FRONTEND_BUCKET_DEV"),
  S3_FRONTEND_BUCKET_PROD: getEnvironmentVariable("S3_FRONTEND_BUCKET_PROD"),
};
