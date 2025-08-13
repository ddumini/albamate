import EmptyCard from '@common/EmptyCard';
import AlbaListSkeleton from '@common/list/AlbaListSkeleton';
import ListWrapper from '@common/list/ListWrapper';

import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import type { AlbaItem } from '@/shared/types/alba';

import AlbaCard from './AlbaCard';

interface InfiniteScrollProps {
  data: AlbaItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: Error | null;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onRetry?: () => void;
  children?: React.ReactNode;
}

const InfiniteScroll = ({
  data,
  isLoading,
  isLoadingMore,
  error,
  loadMoreRef,
  children,
  onRetry,
}: InfiniteScrollProps) => {
  // 에러 상태
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <p className="text-lg text-gray-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          type="button"
          onClick={() => onRetry?.()}
        >
          새로고침
        </button>
      </div>
    );
  }

  // 초기 로딩 상태
  if (isLoading) {
    return <AlbaListSkeleton count={6} hasFilterBar={false} />;
  }

  // 빈 상태
  if (data.length === 0) {
    return (
      <EmptyCard
        description="1분 만에 등록하고 알바를 구해보세요!"
        title="등록된 알바폼이 없어요."
        type="albaList"
        wrapClassName="min-h-[60vh]"
      />
    );
  }

  return (
    <div className="mb-68">
      <ListWrapper
        className="mb-68"
        items={data}
        renderItem={(item: AlbaItem) => <AlbaCard key={item.id} item={item} />}
      >
        {children}
      </ListWrapper>

      {/* 스켈레톤과 Observer 요소를 분리 */}
      {isLoadingMore && <LoadingSpinner className="mx-auto" size="lg" />}

      {/* Observer 전용 요소 - 항상 존재 */}
      <div
        ref={loadMoreRef}
        className="h-1 w-full"
        style={{ minHeight: '1px' }}
      />
    </div>
  );
};

export default InfiniteScroll;
