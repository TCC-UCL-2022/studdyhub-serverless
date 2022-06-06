function getEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined.`);
  }

  return value;
}

export const environments = {
  DB_HOST: getEnvironmentVariable("DB_HOST"),
  DB_PORT: Number(getEnvironmentVariable("DB_PORT")),
  DB_NAME: getEnvironmentVariable("DB_NAME"),
  DB_USERNAME: getEnvironmentVariable("DB_USERNAME"),
  DB_PASSWORD: getEnvironmentVariable("DB_PASSWORD"),
  S3_FRONTEND_UPLOAD_BUCKET: getEnvironmentVariable(
    "S3_FRONTEND_UPLOAD_BUCKET"
  ),
  S3_VIDEO_PROCESS_INPUT_BUCKET: getEnvironmentVariable(
    "S3_VIDEO_PROCESS_INPUT_BUCKET"
  ),
  S3_FRONTEND_BUCKET_DEV: getEnvironmentVariable("S3_FRONTEND_BUCKET_DEV"),
  S3_FRONTEND_BUCKET_PROD: getEnvironmentVariable("S3_FRONTEND_BUCKET_PROD"),
};
