import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculties,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.ObjectId, trim: true, required: true, ref: 'course' },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, unique: true, trim: true, required: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, trim: true, required: true },
  credits: { type: Number, trim: true, required: true },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: { type: Boolean, default: false },
});

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.ObjectId,
    trim: true,
    required: true,
    ref: 'course',
    unique: true,
  },
  faculties: [{ type: Schema.ObjectId, ref: 'faculty' }],
});

const CourseModel = model<TCourse>('course', courseSchema);
const CourseFacultyModel = model<TCourseFaculties>(
  'courseFaculty',
  courseFacultiesSchema,
);

export { CourseModel, CourseFacultyModel };
