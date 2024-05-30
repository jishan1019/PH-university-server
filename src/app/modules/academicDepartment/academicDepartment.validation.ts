import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academic faculty must be string',
      required_error: 'Academic Faculty id is required',
    }),
  }),
});

const academicDepartmentValidationUpdateSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academic faculty must be string',
      })
      .optional(),
  }),
});

export {
  academicDepartmentValidationSchema,
  academicDepartmentValidationUpdateSchema,
};
