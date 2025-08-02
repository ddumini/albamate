import * as z from 'zod';

// Worker
export const createWorkerSchema = z.object({
  name: z.string().min(1, '이름은 필수입니다.'),
  nickname: z.string().min(1, '닉네임은 필수입니다.'),
  phoneNumber: z
    .string()
    .min(1, '연락처는 필수입니다.')
    .regex(/^[0-9]+$/, '숫자만 입력해주세요.'),
  imageUrl: z.string().optional().nullable(), // 이미지 필드는 useState로 관리
});

export type UpdateWorkerMyProfile = z.infer<typeof createWorkerSchema>;
export type UpdateWorkerMyProfileRequest = UpdateWorkerMyProfile;

// Owner
export const createOwnerSchema = z.object({
  nickname: z.string().min(1, '닉네임은 필수입니다.'),
  storeName: z.string().min(1, '가게 이름은 필수입니다.'),
  storePhoneNumber: z
    .string()
    .min(1, '연락처는 필수입니다.')
    .regex(/^[0-9]+$/, '숫자만 입력해주세요.'),
  phoneNumber: z
    .string()
    .optional()
    .refine(val => !val || /^[0-9]+$/.test(val), {
      message: '숫자만 입력해주세요.',
    }),
  location: z.string().min(1, '가게 위치는 필수입니다.'),
  imageUrl: z.string().optional().nullable(), // 프로필 이미지 업로드 후 별도로 다룸
});

export type UpdateOwnerMyProfile = z.infer<typeof createOwnerSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, '현재 비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
        '영문, 숫자, 특수문자(!@#$%^&*)만 사용할 수 있습니다.'
      ),

    newPassword: z
      .string()
      .min(8, '새 비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
        '영문, 숫자, 특수문자(!@#$%^&*)만 사용할 수 있습니다.'
      ),

    checkNewPw: z.string(),
  })
  .refine(data => data.newPassword === data.checkNewPw, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['checkNewPw'],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
