import EmptyCard from '@common/EmptyCard';
import ListWrapper from '@common/list/ListWrapper';

import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import type { AlbaItem } from '@/shared/types/alba';

import AlbaCard from './AlbaCard';

interface InfiniteScrollListProps {
  data: AlbaItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean | undefined;
  error: Error | null;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  emptyTitle?: string;
  emptyDescription?: string;
  loadingText?: string;
  children?: React.ReactNode;
}

const InfiniteScroll = ({
  data,
  isLoading,
  isLoadingMore,
  hasNextPage,
  error,
  loadMoreRef,
  loadingText = '로딩 중...',
  children,
}: InfiniteScrollListProps) => {
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
          onClick={() => window.location.reload()}
        >
          새로고침
        </button>
      </div>
    );
  }

  // 초기 로딩 상태
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-lg text-gray-600">{loadingText}</div>
      </div>
    );
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

      {/* 무한스크롤 트리거 - 공용 훅의 loadMoreRef 사용 */}
      <div ref={loadMoreRef} className="flex h-10 items-center justify-center">
        {isLoadingMore && (
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
