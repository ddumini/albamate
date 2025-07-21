'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Writer } from '@/features/albatalk/types/albatalk';
import { cn } from '@/shared/lib/cn';

import PostMetaInfoUser from './PostMetaInfoUser';

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

    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prevCount => prevCount - 1);
      console.log(`좋아요 취소 : ${postId}`);
    } else {
      setIsLiked(true);
      setLikeCount(prevCount => prevCount + 1);
      console.log(`좋아요 추가 : ${postId}`);
    }
  };

  return (
    <div
      className={cn('flex justify-between text-xs text-gray-500', className)}
    >
      <PostMetaInfoUser createdAt={createdAt} writer={writer} />

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
        <div className="flex">
          <button
            aria-label="좋아요 버튼"
            className="transition-transform duration-150 hover:scale-110 active:scale-95"
            type="button"
            onClick={handleLikeToggle}
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
