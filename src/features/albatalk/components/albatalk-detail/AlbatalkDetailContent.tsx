'use client';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface AlbatalkDetailContentProps {
  content: string;
  imageUrl?: string | null;
  className?: string;
}

const AlbatalkDetailContent = ({
  content,
  imageUrl,
  className,
}: AlbatalkDetailContentProps) => {
  const [imageError, setImageError] = useState(false);


  // 간단한 URL 유효성 검사
  const isValidImageUrl =
    imageUrl &&
    imageUrl.trim() !== '' &&
    (imageUrl.startsWith('http') || imageUrl.startsWith('/'));

  return (
    <div className={cn('text-sm md:text-base lg:text-xl', className)}>
      {isValidImageUrl &&
        !imageError && (
          <Image
            alt="게시글 이미지"
            height={200}
            src={imageUrl}
            width={327}
            onError={() => setImageError(true)}
          />
        )}
      {content}
    </div>
  );
};

export default AlbatalkDetailContent;
