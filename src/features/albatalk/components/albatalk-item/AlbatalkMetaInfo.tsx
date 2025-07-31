'use client';
import Image from 'next/image';
import React, { useState } from 'react';

import { Writer } from '@/features/albatalk/schemas/albatalk.schema';
import { cn } from '@/shared/lib/cn';

import {
  useAddAlbatalkLike,
  useRemoveAlbatalkLike,
} from '../../hooks/useAlbatalk';
import AlbatalkMetaInfoUser from './AlbatalkMetaInfoUser';

interface AlbatalkMetaInfoProps {
  writer: Writer;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  className?: string;
  // 상세 페이지에서만 사용할 props들
  albatalkId?: number;
  initialIsLiked?: boolean;
  isInteractive?: boolean; // 상호작용 가능 여부
}

const AlbatalkMetaInfo = ({
  writer,
  createdAt,
  commentCount,
  likeCount: initialLikeCount,
  albatalkId,
  initialIsLiked = false,
  isInteractive = false, // 기본값은 읽기 전용
  className,
}: AlbatalkMetaInfoProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isToggling, setIsToggling] = useState(false);

  const likeIconSrc = isLiked ? '/icons/like-active.svg' : '/icons/like.svg';

  const addLikeMutation = useAddAlbatalkLike();
  const removeLikeMutation = useRemoveAlbatalkLike();

  const isLoading = addLikeMutation.isPending || removeLikeMutation.isPending;

  const handleLikeToggle = async (e: React.MouseEvent) => {
    // 중복 클릭 방지
    if (!isInteractive || !albatalkId || isLoading || isToggling) return;

    e.preventDefault();
    e.stopPropagation();

    setIsToggling(true); // 토글 시작

    // 낙관적 업데이트 (Optimistic Update)
    const previousLiked = isLiked;
    const previousCount = likeCount;

    // UI 즉시 업데이트
    setIsLiked(!isLiked);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));

    try {
      if (isLiked) {
        await removeLikeMutation.mutateAsync(albatalkId); // DELETE
      } else {
        await addLikeMutation.mutateAsync(albatalkId); // POST
      }
    } catch (error) {
      setIsLiked(previousLiked);
      setLikeCount(previousCount);
      console.error('좋아요 토글 실패 : ', error);
    } finally {
      setIsToggling(false); // 토글 완료
    }
  };

  return (
    <div
      className={cn('flex justify-between text-xs text-gray-500', className)}
    >
      <AlbatalkMetaInfoUser createdAt={createdAt} writer={writer} />

      <div className="flex gap-12">
        {/* 댓글 수 */}
        <div className="flex">
          <div className="relative size-24 lg:size-36">
            <Image alt="comment_count" layout="fill" src="/icons/comment.svg" />
          </div>
          <span className="ml-2 self-center">{commentCount}</span>
        </div>

        {/* 좋아요 */}
        <div className="flex">
          {isInteractive ? (
            // 상세 페이지: 버튼 (클릭 가능)
            <button
              aria-label="좋아요 버튼"
              className="transition-transform duration-150 hover:scale-110 active:scale-95"
              disabled={isLoading}
              type="button"
              onClick={handleLikeToggle}
            >
              <div className="relative size-24 lg:size-36">
                <Image alt="like_icon" layout="fill" src={likeIconSrc} />
              </div>
            </button>
          ) : (
            // 목록 페이지: 읽기 전용
            <div className="relative size-24 lg:size-36">
              <Image alt="like_icon" layout="fill" src="/icons/like.svg" />
            </div>
          )}
          <span className="ml-2 min-w-24 self-center">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbatalkMetaInfo;
