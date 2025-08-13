import AlbaCardSkeleton from '@common/list/AlbaCardSkeleton';
import { useMemo } from 'react';

const LoadMoreSkeleton = () => {
  const skeletonKeys = useMemo(
    () => Array.from({ length: 6 }, () => `${Date.now()}-${Math.random()}`),
    []
  );

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {skeletonKeys.map(key => (
        <AlbaCardSkeleton key={key} />
      ))}
    </div>
  );
};

export default LoadMoreSkeleton;
