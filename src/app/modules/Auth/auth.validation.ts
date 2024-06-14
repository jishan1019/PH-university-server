import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
      invalid_type_error: 'id must be string',
    }),
    password: z.string({
      required_error: 'password is required',
      invalid_type_error: 'Password must be string',
    }),
  }),
});

export { loginValidationSchema };
