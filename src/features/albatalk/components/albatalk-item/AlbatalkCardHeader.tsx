'use client';

import { useRouter } from 'next/navigation';

import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';
import { cn } from '@/shared/lib/cn';

import { useDeleteAlbatalk } from '../../hooks/useAlbatalk';

interface AlbatalkHeaderProps {
  title: string;
  albatalkId: number;
  className?: string;
  titleClassName?: string;
}

const AlbatalkCardHeader = ({
  title,
  albatalkId,
  className,
  titleClassName,
}: AlbatalkHeaderProps) => {
  const router = useRouter();

  const deleteMutation = useDeleteAlbatalk();

  const handleActionClick = async (option: string) => {
    if (option === 'edit') {
      // 수정 페이지로 이동
      router.push(`/addtalk?albatalkId=${albatalkId}`);
    } else if (option === 'delete') {
      const isConfirmed = window.confirm('정말 이 게시글을 삭제하시겠습니까?');

      if (isConfirmed) {
        try {
          await deleteMutation.mutateAsync(albatalkId);
          alert('게시글이 성공적으로 삭제되었습니다.');

          router.push('/albatalk');
        } catch (error) {
          console.error('게시글 삭제 실패:', error);
          alert('게시글 삭제 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const menuOptions = [
    { label: '수정하기', onClick: () => handleActionClick('edit') },
    {
      label: deleteMutation.isPending ? '삭제 중...' : '삭제하기',
      onClick: () => handleActionClick('delete'),
      disabled: deleteMutation.isPending,
    },
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

export default AlbatalkCardHeader;
