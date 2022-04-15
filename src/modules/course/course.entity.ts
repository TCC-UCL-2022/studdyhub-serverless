import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseCollection } from "../../common/entities";
import { SectionEntity } from "../section";
import { StudentCourseEntity } from "../student-course";
import { TeacherEntity } from "../teacher";

@Entity("course")
export class CourseEntity extends BaseCollection {
  @Column({ name: "title", type: "varchar", length: 255 })
  title!: string;

  @Column({ name: "description", type: "varchar" })
  description!: string;

  @Column({ name: "published", type: "boolean", default: false })
  published!: boolean;

  @ManyToOne((type) => TeacherEntity, (teacher) => teacher.courses, {
    nullable: false,
  })
  teacher!: TeacherEntity;

  @OneToMany((type) => SectionEntity, (section) => section.course)
  sections!: SectionEntity[];

  @OneToMany(
    (type) => StudentCourseEntity,
    (studentCourse) => studentCourse.student
  )
  students!: StudentCourseEntity[];
}
