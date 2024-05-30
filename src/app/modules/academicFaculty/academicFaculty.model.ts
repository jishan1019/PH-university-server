import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, required: true, unique: true },
});

const AcademicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);

export { AcademicFacultyModel };
