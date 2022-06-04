import { EnrollmentController } from "../../modules/enrollment";

const controller = new EnrollmentController();

export const createErollment = controller.createErollment.bind(controller);
export const getEnrollmentsByUserId =
  controller.getEnrollmentsByUserId.bind(controller);
