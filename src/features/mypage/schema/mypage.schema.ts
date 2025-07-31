import * as z from 'zod';

export const createUserSchema = z.object({
  location: z.string(),
  phoneNumber: z.string(),
  storePhoneNumber: z.string(),
  storeName: z.string(),
  role: z.enum(['APPLICANT', 'OWNER']),
  imageUrl: z.string(),
  nickname: z.string(),
  name: z.string(),
  email: z.email(),
  id: z.number(),
});

export const createWorkerSchema = z.object({
  name: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
  imageUrl: z.string(),
});

export type UpdateMyProfile = z.infer<typeof createUserSchema>;
export type UpdateMyProfileRequest = Omit<UpdateMyProfile, 'id' | 'email'>;

export type UpdateWorkerMyProfile = z.infer<typeof createWorkerSchema>;
export type UpdateWorkerMyProfileRequest = UpdateWorkerMyProfile;
