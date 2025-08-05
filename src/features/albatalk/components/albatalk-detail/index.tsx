'use client';

import EmptyCard from '@/shared/components/common/EmptyCard';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

import { useAlbatalkDetail } from '../../hooks/useAlbatalk';
import AlbatalkDetailContent from './AlbatalkDetailContent';
import AlbatalkDetailHeader from './AlbatalkDetailHeader';
import CommentSection from './CommentSection';

interface AlbatalkDetailProps {
  albatalkId: number;
}

const AlbatalkDetail = ({ albatalkId }: AlbatalkDetailProps) => {
  const {
    data: albatalk,
    isPending,
    isError,
    error,
  } = useAlbatalkDetail(albatalkId);

  if (isPending) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError) {
    console.error('알바톡 상세 조회 에러:', error);
    return <div>에러 발생: {error?.message}</div>;
  }

  if (!albatalk) {
    return (
      <EmptyCard
        description="궁금한 점, 고민 등의 게시글을 올려보세요"
        title="작성한 게시글이 없어요."
        type="post"
      />
    );
  }

  return (
    <div className="mb-100 flex flex-col gap-40 pt-44">
      <AlbatalkDetailHeader data={albatalk} />
      <AlbatalkDetailContent
        content={albatalk.content}
        imageUrl={albatalk.imageUrl}
      />
      <CommentSection albatalkId={albatalk.id} />
    </div>
  );
};

export default AlbatalkDetail;
