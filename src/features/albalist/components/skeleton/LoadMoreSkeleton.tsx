import AlbaCardSkeleton from './AlbaCardSkeleton';

const LoadMoreSkeleton = () => {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <AlbaCardSkeleton key={`loading-more-${index}`} />
      ))}
    </div>
  );
};

export default LoadMoreSkeleton;
