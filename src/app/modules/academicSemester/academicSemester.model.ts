import { Schema, model } from 'mongoose';
import { TAcademicSemester, TMonths } from './academicSemester.interface';

const month: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: ['Autumn', 'Summer', 'Fail'],
  },
  code: {
    type: String,
    enum: ['01', '02', '03'],
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    enum: month,
  },
  endMonth: {
    type: String,
    enum: month,
  },
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);

export { AcademicSemesterModel };
