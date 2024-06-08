import { z } from 'zod';

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const courseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be string',
    }),
    prefix: z.string({
      invalid_type_error: 'prefix must be string',
    }),
    code: z.number({
      invalid_type_error: 'prefix must be number',
    }),
    credits: z.number({
      invalid_type_error: 'credits must be number',
    }),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
  }),
});

export { courseValidationSchema };
