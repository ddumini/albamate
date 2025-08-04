const AlbaCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* 이미지 영역 */}
      <div className="mb-3 h-32 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />

      {/* 제목 영역 */}
      <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* 부제목/설명 영역 */}
      <div className="mb-3 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* 태그들 영역 */}
      <div className="mb-3 flex gap-2">
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* 하단 정보 영역 (날짜, 스크랩 수 등) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};

export default AlbaCardSkeleton;
