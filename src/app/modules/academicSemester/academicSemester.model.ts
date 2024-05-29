import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterMonth,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: academicSemesterName,
  },
  code: {
    type: String,
    enum: academicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: academicSemesterMonth,
  },
  endMonth: {
    type: String,
    enum: academicSemesterMonth,
  },
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);

export { AcademicSemesterModel };
