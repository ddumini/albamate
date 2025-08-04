import AlbaCardSkeleton from './AlbaCardSkeleton';

const AlbaListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="mb-68">
      {/* 필터바 스켈레톤 - 실제 필터바와 동일한 패딩과 간격 */}
      <div className="mb-24 flex flex-col gap-16 px-16 py-20">
        {/* 검색바 - 높이 증가 */}
        <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

        {/* 필터 버튼들 - 높이와 너비 조정 */}
        <div className="flex gap-12">
          <div className="h-40 w-80 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-40 w-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-40 w-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-40 w-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* 카드 리스트 - 실제 ListWrapper와 동일한 패딩과 간격 */}
      <div className="grid gap-16 px-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <AlbaCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default AlbaListSkeleton;
