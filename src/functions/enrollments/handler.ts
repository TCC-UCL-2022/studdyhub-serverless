import { container } from "../../container";
import { EnrollmentController } from "../../modules/enrollment";

const enrollmentController = container.resolve(EnrollmentController);

export const { createErollment, getEnrollmentsByUserId } = enrollmentController;
