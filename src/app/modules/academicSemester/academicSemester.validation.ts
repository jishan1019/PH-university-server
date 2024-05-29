import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterName,
} from './academicSemester.constant';
import { TAcademicSemesterName } from './academicSemester.interface';

const academicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
  }),
});

export { academicValidationSchema };
