import { z } from 'zod';

const monthsEnum = z.enum([
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
]);

const academicValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fail']),
    code: z.enum(['01', '02', '03']),
    year: z.date(),
    startMonth: monthsEnum,
    endMonth: monthsEnum,
  }),
});

export { academicValidationSchema };
