import EmptyCard from '@common/EmptyCard';
import ListWrapper from '@common/list/ListWrapper';
import { useEffect, useRef } from 'react';

import type { AlbaItem } from '@/shared/types/alba';

import AlbaCard from './AlbaCard';

interface InfiniteScrollAlbaListProps {
  data: AlbaItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasNextPage: boolean;
  error: Error | null;
  onLoadMore: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  loadingText?: string;
  children?: React.ReactNode; // FloatingFormButton 등
}

const InfiniteScroll = ({
  data,
  isLoading,
  isLoadingMore,
  hasNextPage,
  error,
  onLoadMore,
  loadingText = '로딩 중...',
  children,
}: InfiniteScrollAlbaListProps) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef(onLoadMore);

  // onLoadMore 함수 참조 업데이트
  useEffect(() => {
    loadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  // Intersection Observer로 무한스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting && hasNextPage && !isLoadingMore) {
          loadMoreRef.current();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // 100px 전에 미리 로딩
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isLoadingMore]);

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

      {/* 무한스크롤 트리거 */}
      <div ref={observerRef} className="flex h-10 items-center justify-center">
        {isLoadingMore && (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span className="text-sm text-gray-600">
              더 많은 알바를 불러오는 중...
            </span>
          </div>
        )}
        {!hasNextPage && data.length > 0 && (
          <div className="text-sm text-gray-500">모든 알바를 불러왔습니다.</div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
