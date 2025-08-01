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

// AlbatalksResponse 스키마
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

// 댓글 조회 파라미터
export const GetCommentsParamsSchema = z.object({
  page: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
});

// 댓글 작성 파라미터
export const CreateCommentParamsSchema = z.object({
  postId: z.number(),
  content: z.string().min(1, '댓글 내용을 입력해주세요'),
});

// 댓글 수정 파라미터
export const UpdateCommentParamsSchema = z.object({
  commentId: z.number(),
  postId: z.number(),
  content: z.string().min(1, '댓글 내용을 입력해주세요'),
});

// 댓글 작성/수정 응답 스키마
export const CommentResponseSchema = z.object({
  id: z.number(),
  writer: WriterSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  content: z.string(),
});

// 스키마로부터 타입을 추론
export type Writer = z.infer<typeof WriterSchema>;
export type Albatalk = z.infer<typeof AlbatalkSchema>;
export type AlbatalksResponse = z.infer<typeof AlbatalksResponseSchema>;
export type AlbatalkDetailResponse = z.infer<
  typeof AlbatalkDetailResponseSchema
>;
export type GetAlbatalksParams = z.infer<typeof GetAlbatalksParamsSchema>;
export type SearchParams = z.infer<typeof SearchParamsSchema>;

export type Comment = z.infer<typeof CommentSchema>;
export type CommentsResponse = z.infer<typeof CommentsResponseSchema>;
export type GetCommentsParams = z.infer<typeof GetCommentsParamsSchema>;
export type CreateCommentParams = z.infer<typeof CreateCommentParamsSchema>;
export type UpdateCommentParams = z.infer<typeof UpdateCommentParamsSchema>;
export type CommentResponse = z.infer<typeof CommentResponseSchema>;
