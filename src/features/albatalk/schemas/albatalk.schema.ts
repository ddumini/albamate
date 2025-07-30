import { z } from 'zod';

// Writer 스키마
export const WriterSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  imageUrl: z.string().nullable(),
});

// Albatalk 스키마
export const AlbatalkSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().nullable(),
  likeCount: z.number(),
  commentCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: WriterSchema,
});

// AlbatalksResponse 스미카
export const AlbatalksResponseSchema = z.object({
  data: z.array(AlbatalkSchema),
  nextCursor: z.number().nullable(),
});

// AlbatalkDetailResponse 스키마
export const AlbatalkDetailResponseSchema = AlbatalkSchema.extend({
  isLiked: z.boolean(),
});

// GetAlbatalksParams 스키마
export const GetAlbatalksParamsSchema = z.object({
  limit: z.number(),
  cursor: z.number().optional(),
  orderBy: z.enum(['mostRecent', 'mostCommented', 'mostLiked']).optional(),
  keyword: z.string().optional(),
});

// URL 파라미터용 스키마 (문자열로 전달되는 값들을 변환)
export const SearchParamsSchema = z.object({
  cursor: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : undefined)),
  limit: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : 9)),
  orderBy: z.enum(['mostRecent', 'mostCommented', 'mostLiked']).optional(),
  keyword: z.string().optional(),
});

// Comment 스키마
export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  writer: WriterSchema,
});

// CommentsResponse 스키마
export const CommentsResponseSchema = z.object({
  data: z.array(CommentSchema),
  totalItemCount: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});

// 스키마로부터 타입을 추론
export type Writer = z.infer<typeof WriterSchema>;
export type Albatalk = z.infer<typeof AlbatalkSchema>;
export type AlbatalksResponse = z.infer<typeof AlbatalksResponseSchema>;
export type AlbatalkDetailResponse = z.infer<
  typeof AlbatalkDetailResponseSchema
>;
export type GetAlbatalksParams = z.infer<typeof GetAlbatalksParamsSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type CommentsResponse = z.infer<typeof CommentsResponseSchema>;
export type SearchParams = z.infer<typeof SearchParamsSchema>;

// 기존 코드와의 호환성을 위한 타입 별칭
export type Post = Albatalk;
export type PostDetailResponse = AlbatalkDetailResponse;
