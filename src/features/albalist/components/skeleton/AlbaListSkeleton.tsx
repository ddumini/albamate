import AlbaCardSkeleton from './AlbaCardSkeleton';

const AlbaListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="mb-68">
      {/* 필터바 스켈레톤 */}
      <div className="mb-6 flex flex-col gap-4 p-4">
        {/* 검색바 */}
        <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

        {/* 필터 버튼들 */}
        <div className="flex gap-2">
          <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-16 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* 카드 리스트 */}
      <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <AlbaCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default AlbaListSkeleton;
