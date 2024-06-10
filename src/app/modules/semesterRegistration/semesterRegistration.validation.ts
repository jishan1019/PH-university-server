import { z } from 'zod';

const semesterRegistrationValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more then 20 character' })
    .optional(),
});

export { semesterRegistrationValidationSchema };
