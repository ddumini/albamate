import * as z from 'zod';

export const createApplicationRequestSchema = z.object({
  password: z
    .string()
    .min(8, { error: '비밀번호는 8자 이상 입력해주세요.' })
    .regex(/^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, {
      error:
        '비밀번호는 영문 대/소문자, 숫자, 특수문자(!@#$%^&*)만 포함할 수 있습니다.',
    }),
  introduction: z
    .string()
    .max(200, { error: '최대 200자까지 입력 가능합니다.' }),
  resumeName: z.string(),
  resumeId: z.number(),
  experienceMonths: z
    .number({ error: '숫자만 입력해주세요.' })
    .min(0, { error: '0 이상의 숫자를 입력해주세요.' }),
  phoneNumber: z.string(),
  name: z.string(),
});

export const createApplicationResponseSchema = createApplicationRequestSchema
  .omit({ password: true })
  .extend({
    applicantId: z.number().nullable(),
    updatedAt: z.iso.datetime(),
    createdAt: z.iso.datetime(),
    id: z.number(),
    status: z.enum([
      'REJECTED',
      'INTERVIEW_PENDING',
      'INTERVIEW_COMPLETED',
      'HIRED',
    ]),
  });

export const uploadResumeResponseSchema = z.object({
  resumeId: z.number(),
  resumeName: z.string(),
});

export type CreateApplicationRequest = z.infer<
  typeof createApplicationRequestSchema
>;
export type CreateApplicationResponse = z.infer<
  typeof createApplicationResponseSchema
>;
export type UploadResumeResponse = z.infer<typeof uploadResumeResponseSchema>;
