import Image from 'next/image';
import React, { useState } from 'react';

import { Writer } from '@/features/albatalk/types/albatalk';
import Profile from '@/shared/components/common/profile/Profile';
import { cn } from '@/shared/lib/cn';
import { formatDate } from '@/shared/utils/date';

interface PostMetaInfoProps {
  writer: Writer;
  createdAt: string;
  commentCount: number;
  initialLikeCount: number;
  postId: number;
  className?: string;
}

const PostMetaInfo = ({
  writer,
  createdAt,
  commentCount,
  initialLikeCount,
  postId,
  className,
}: PostMetaInfoProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const likeIconSrc = isLiked ? '/icons/like-active.svg' : '/icons/like.svg';

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    setIsLiked(prev => {
      const newIsLiked = !prev;
      setLikeCount(prevCount => (prev ? prevCount - 1 : prevCount + 1));
      console.log(`좋아요 ${prev ? '취소' : '추가'} : ${postId}`);
      return newIsLiked;
    });
  };

  return (
    <div
      className={cn('flex justify-between text-xs text-gray-500', className)}
    >
      <div className="flex items-center gap-7">
        {/* 프로필 이미지 */}
        <div className="size-26">
          {writer.imageUrl ? (
            <Profile
              className="size-26 border-none lg:size-26"
              imageUrl={writer.imageUrl}
            />
          ) : (
            <Profile className="size-26 border-none lg:size-26" sizes="26px" />
          )}
        </div>
        {/* 닉네임 */}
        <span>{writer.nickname}</span>
        <div className="h-12 w-px bg-line-200" />
        {/* 날짜 */}
        <time>{formatDate(createdAt, 'post')}</time>
      </div>

      <div className="flex gap-12">
        {/* 댓글 수 */}
        <div className="flex">
          <Image
            alt="comment_count"
            height={24}
            src="/icons/comment.svg"
            width={24}
          />
          <span className="ml-2 self-center">{commentCount}</span>
        </div>

        {/* 좋아요 */}
        <div className="flex" onClick={handleLikeToggle}>
          <button
            aria-label="좋아요 버튼"
            className="transition-transform duration-150 hover:scale-110 active:scale-95"
            type="button"
          >
            <Image alt="like_icon" height={24} src={likeIconSrc} width={24} />
          </button>
          <span className="ml-2 min-w-24 self-center">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostMetaInfo;
