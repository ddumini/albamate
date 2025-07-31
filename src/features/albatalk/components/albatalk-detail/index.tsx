'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import EmptyCard from '@/shared/components/common/EmptyCard';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

import { useAlbatalkDetail } from '../../hooks/useAlbatalk';
import AlbatalkDetailContent from './AlbatalkDetailContent';
import AlbatalkDetailHeader from './AlbatalkDetailHeader';

interface AlbatalkDetailProps {
  albatalkId: number;
}

const AlbatalkDetail = ({ albatalkId }: AlbatalkDetailProps) => {
  const router = useRouter();
  const { status } = useSession();
  const {
    data: albatalk,
    isPending,
    isError,
    error,
  } = useAlbatalkDetail(albatalkId);

  // 로그인 상태 체크 및 리다이렉트
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner size="lg" />;
  }

  if (isPending) {
    return <LoadingSpinner size="lg" />;
  }

  if (status === 'unauthenticated') {
    return <LoadingSpinner size="lg" />;
  }

  if (isError) {
    console.error('알바톡 상세 조회 에러:', error);
    return <div>에러 발생: {error?.message}</div>;
  }

  if (!albatalk) {
    return <EmptyCard type="post" />;
  }

  return (
    <div className="flex flex-col gap-40 pt-44">
      <AlbatalkDetailHeader data={albatalk} />
      <AlbatalkDetailContent
        content={albatalk.content}
        imageUrl={albatalk.imageUrl}
      />
      {/* <CommentSection initialComments={comments} postId={data.id} /> */}
    </div>
  );
};

export default AlbatalkDetail;
