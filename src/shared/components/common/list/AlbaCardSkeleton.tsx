const AlbaCardSkeleton = () => {
  return (
    <div className="flex-col gap-8 rounded-2xl">
      <div className="aspect-[1/0.637] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

      {/* 태그 영역 */}
      <div className="relative mt-12 flex items-center gap-8 text-sm">
        <div className="h-32 w-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-32 w-55 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* 모집 기간 */}
      <div className="mt-8 h-16 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* 제목 */}
      <div className="mt-12 flex flex-col gap-8">
        <div className="h-20 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-20 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* 하단 통계 정보 */}
      <div className="mt-20 flex h-40 w-full justify-center rounded-lg bg-gray-25 lg:h-45 dark:bg-gray-800">
        <div className="relative flex flex-1 items-center justify-center">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="absolute top-1/2 right-0 h-14 w-1 -translate-y-1/2 bg-gray-100" />
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="absolute top-1/2 right-0 h-14 w-1 -translate-y-1/2 bg-gray-100" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default AlbaCardSkeleton;
