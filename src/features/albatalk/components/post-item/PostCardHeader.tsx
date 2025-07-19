'use client';

import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';
import { cn } from '@/shared/lib/cn';

interface PostHeaderProps {
  title: string;
  postId: number;
  className?: string;
  titleClassName?: string;
}

const PostCardHeader = ({
  title,
  postId,
  className,
  titleClassName,
}: PostHeaderProps) => {
  const handleActionClick = (option: string) => {
    if (option === 'edit') {
      //TODO: 수정 로직
      alert(postId);
    } else if (option === 'delete') {
      //TODO: 삭제 로직
    }
  };

  const menuOptions = [
    { label: '수정하기', onClick: () => handleActionClick('edit') },
    { label: '삭제하기', onClick: () => handleActionClick('delete') },
  ];

  return (
    <div className={cn('mb-8 flex items-start justify-between', className)}>
      <h2
        className={cn(
          'mr-12 line-clamp-2 flex-1 text-lg font-semibold break-words text-gray-900 dark:text-white',
          titleClassName
        )}
      >
        {title}
      </h2>
      <KebabMenuDropdown options={menuOptions} />
    </div>
  );
};

export default PostCardHeader;
