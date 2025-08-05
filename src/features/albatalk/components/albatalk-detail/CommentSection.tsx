'use client';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

import { useAlbatalkCommentsInfinite } from '../../hooks/useAlbatalk';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStatus from './CommentStatus';

interface CommentSectionProps {
  albatalkId: number;
}

const CommentSection = ({ albatalkId }: CommentSectionProps) => {
  const {
    getData,
    isLoading,
    isError,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    data,
  } = useAlbatalkCommentsInfinite(albatalkId);

  const comments = getData(); // 모든 댓글 가져오기
  // 타입 가드로 안전하게 접근
  const firstPage = data?.pages?.[0];
  const totalCount =
    firstPage && 'totalItemCount' in firstPage ? firstPage.totalItemCount : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError)
    return <div className="text-red-500">댓글을 불러오는데 실패했습니다.</div>;

  return (
    <div className="flex flex-col gap-24 lg:gap-40">
      <CommentStatus count={totalCount} />
      <CommentForm albatalkId={albatalkId} />
      <CommentList albatalkId={albatalkId} comments={comments} />

      {/* 무한 스크롤 트리거 */}
      {hasNextPage && <div ref={loadMoreRef} className="h-4 w-full" />}
      {isFetchingNextPage && (
        <div className="flex justify-center py-16">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
