'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import AlbaDropdown from '@/features/albalist/components/AlbaDropdown';

interface PostHeaderProps {
  title: string;
  postId: number;
}

const PostCardHeader = ({ title, postId }: PostHeaderProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleActionClick = (option: string) => {
    if (option === 'edit') {
      //TODO: 수정 로직
      alert(postId);
    } else if (option === 'delete') {
      //TODO: 삭제 로직
    }
    setOpen(false); // 클릭 후 드롭다운 닫기
  };

  const menuOptions = [
    { label: '수정하기', onClick: () => handleActionClick('edit') },
    { label: '삭제하기', onClick: () => handleActionClick('delete') },
  ];

  return (
    <div className="mb-8 flex items-start justify-between">
      <h2 className="mr-12 line-clamp-2 flex-1 text-lg font-semibold break-words text-gray-900 dark:text-white">
        {title}
      </h2>
      <div ref={dropdownRef} className="relative ml-auto">
        <Image
          alt="드롭다운 아이콘"
          className="cursor-pointer"
          height={24}
          role="button"
          src="/icons/kebab-menu.svg"
          width={24}
          onClick={e => {
            e.stopPropagation();
            setOpen(prev => !prev);
          }}
        />
        {open && <AlbaDropdown options={menuOptions} />}
      </div>
    </div>
  );
};

export default PostCardHeader;
