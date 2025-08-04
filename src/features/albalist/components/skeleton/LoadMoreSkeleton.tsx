import { useMemo } from 'react';

import AlbaCardSkeleton from './AlbaCardSkeleton';

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
