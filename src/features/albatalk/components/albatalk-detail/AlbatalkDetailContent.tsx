import { cn } from '@/shared/lib/cn';

interface AlbatalkDetailContentProps {
  content: string;
  className?: string;
}

const AlbatalkDetailContent = ({
  content,
  className,
}: AlbatalkDetailContentProps) => {
  return (
    <div className={cn('text-sm md:text-base lg:text-xl', className)}>
      {content}
    </div>
  );
};

export default AlbatalkDetailContent;
