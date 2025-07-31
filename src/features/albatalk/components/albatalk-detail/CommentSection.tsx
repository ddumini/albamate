'use client';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

import { useAlbatalkComments } from '../../hooks/useAlbatalk';
import { CommentsResponse } from '../../schemas/albatalk.schema';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStatus from './CommentStatus';

interface CommentSectionProps {
  albatalkId: number;
  initialComments?: CommentsResponse;
}

const CommentSection = ({
  albatalkId,
  initialComments,
}: CommentSectionProps) => {
  const {
    data: commentsResponse,
    isPending,
    isError,
    error,
  } = useAlbatalkComments(albatalkId, { page: 1, pageSize: 10 });

  const currentComments = commentsResponse || initialComments;

  if (isPending && !initialComments) {
    return <LoadingSpinner size="lg" />;
  }

  if (isError) {
    console.error('댓글 조회 에러:', error);
    return <div className="text-red-500">댓글을 불러오는데 실패했습니다.</div>;
  }

  if (!currentComments) {
    return <div>댓글 데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-24 lg:gap-40">
      <CommentStatus count={currentComments.totalItemCount} />
      <CommentForm albatalkId={albatalkId} />
      <CommentList albatalkId={albatalkId} comments={currentComments.data} />
    </div>
  );
};

export default CommentSection;
