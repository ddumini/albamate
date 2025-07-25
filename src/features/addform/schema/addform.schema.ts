import * as z from 'zod';

export const createFormRequestSchema = z.object({
  isPublic: z.boolean(),
  hourlyWage: z
    .number()
    .int()
    .min(10030, { error: '최저시급(10,030원) 이상을 입력해야 합니다.' }),
  isNegotiableWorkDays: z.boolean(),
  workDays: z.array(z.string()),
  workEndTime: z.string(),
  workStartTime: z.string(),
  workEndDate: z.iso.datetime(),
  workStartDate: z.iso.datetime(),
  location: z.string(),
  preferred: z.string(),
  age: z.string(),
  education: z.string(),
  gender: z.string(),
  numberOfPositions: z.number(),
  imageUrls: z.array(z.url()),
  recruitmentEndDate: z.iso.datetime(),
  recruitmentStartDate: z.iso.datetime(),
  description: z
    .string()
    .max(200, { error: '최대 200자까지 입력 가능합니다.' }),
  title: z.string(),
});

export const createFormResponseSchema = createFormRequestSchema.extend({
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  ownerId: z.number(),
  id: z.number(),
});

export type CreateFormRequest = z.infer<typeof createFormRequestSchema>;
export type CreateFormResponse = z.infer<typeof createFormResponseSchema>;
