import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterMonth,
  academicSemesterCode,
  academicSemesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw new Error('Semester already exists');
  }

  next();
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);

export { AcademicSemesterModel };
