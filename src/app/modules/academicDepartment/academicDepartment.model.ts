import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExistDepartment = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isExistDepartment) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'Academic Department already exists',
    );
  }

  next();
});

academicDepartmentSchema.pre('updateOne', async function (next) {
  const query = this.getQuery();

  const isExistDepartment = await AcademicDepartmentModel.findOne(query);

  if (!isExistDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Department not exists');
  }

  next();
});

const AcademicDepartmentModel = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);

export { AcademicDepartmentModel };
