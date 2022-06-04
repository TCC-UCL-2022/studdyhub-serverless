import { Handler } from "aws-lambda";
import { HandlerEvent } from "../../common/types";
import { Logger, MessageUtil } from "../../common/utils";
import { CreateEnrollmentDto } from "./dto";
import { EnrollmentService } from "./enrollment.service";

export class EnrollmentController {
  private readonly logger: Logger;
  private readonly enrollmentService: EnrollmentService;

  constructor() {
    this.logger = Logger.createLogger("EnrollmentController");
    this.enrollmentService = new EnrollmentService();
  }

  createErollment: Handler<HandlerEvent> = async (event) => {
    this.logger.debug("[createErollment] invoked");

    try {
      const payload: CreateEnrollmentDto = JSON.parse(event.body);

      const enrollment = await this.enrollmentService.createErollment(payload);

      this.logger.debug("[createErollment] created enrollment:", enrollment.id);

      return MessageUtil.success(enrollment);
    } catch (err) {
      this.logger.error("[createErollment] failed:", err);

      return MessageUtil.error(err);
    }
  };

  getEnrollmentsByUserId: Handler<HandlerEvent<{ userId: string }>> = async (
    event
  ) => {
    this.logger.debug("[getEnrollmentsByUserId] invoked");

    try {
      const userId = event.pathParameters.userId;

      const enrollments = await this.enrollmentService.getEnrollmentsByUserId(
        userId
      );

      this.logger.debug(
        "[getEnrollmentsByUserId] found enrollments:",
        enrollments.length
      );

      return MessageUtil.success(enrollments);
    } catch (err) {
      this.logger.error("[getEnrollmentsByUserId] failed:", err);

      return MessageUtil.error(err);
    }
  };
}
