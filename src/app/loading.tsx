import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export default Loading;
