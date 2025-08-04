import * as z from 'zod';

export const createFormRequestSchema = z.object({
  isPublic: z.boolean(),
  hourlyWage: z
    .number({
      error: `최저시급(${process.env.NEXT_PUBLIC_MINIMUM_WAGE}원) 이상을 입력해야 합니다.`,
    })
    .int()
    .min(10030, {
      error: `최저시급(${process.env.NEXT_PUBLIC_MINIMUM_WAGE}원) 이상을 입력해야 합니다.`,
    }),
  isNegotiableWorkDays: z.boolean(),
  workDays: z.array(z.string()).min(1, { error: '근무 요일을 입력해주세요.' }),
  workEndTime: z
    .string({ error: '근무 종료 시간을 입력해주세요.' })
    .min(1, { error: '근무 종료 시간을 입력해주세요.' }),
  workStartTime: z.string().min(1, { error: '근무 시작 시간을 입력해주세요.' }),
  workEndDate: z.iso.datetime(),
  workStartDate: z.iso.datetime({ error: '근무 기간을 입력해주세요.' }),
  location: z.string().min(1, { error: '근무 위치를 입력해주세요.' }),
  preferred: z
    .string()
    .min(1, { error: '우대사항을 선택하거나 입력해주세요.' }),
  age: z.string().min(1, { error: '연령을 선택하거나 입력해주세요.' }),
  education: z.string().min(1, { error: '학력을 선택하거나 입력해주세요.' }),
  gender: z.string().min(1, { error: '성별을 선택하거나 입력해주세요.' }),
  numberOfPositions: z
    .number({ error: '모집 인원은 숫자로 입력해야 합니다.' })
    .min(0, { error: '모집 인원은 0명 이상이어야 합니다.' }),
  imageUrls: z.array(z.url()),
  recruitmentEndDate: z.iso.datetime(),
  recruitmentStartDate: z.iso.datetime({ error: '모집 기간을 입력해주세요.' }),
  description: z
    .string()
    .min(1, { error: '소개글을 입력해주세요.' })
    .max(200, { error: '최대 200자까지 입력 가능합니다.' }),
  title: z
    .string()
    .min(1, { error: '제목을 입력해주세요.' })
    .max(30, { error: '최대 30자까지 입력 가능합니다.' }),
});

export const createFormResponseSchema = createFormRequestSchema.extend({
  updatedAt: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  ownerId: z.number(),
  id: z.number(),
  applyCount: z.number(),
  scrapCount: z.number(),
});

export type CreateFormRequest = z.infer<typeof createFormRequestSchema>;
export type CreateFormResponse = z.infer<typeof createFormResponseSchema>;
