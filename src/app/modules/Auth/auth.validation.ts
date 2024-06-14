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

const changePassValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more then 20 character' }),

    newPassword: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more then 20 character' }),
  }),
});

export { loginValidationSchema, changePassValidationSchema };
