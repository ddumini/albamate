'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Comment } from '../../types/albatalk';
import CommentItem from './CommentItem';

interface CommentListProps {
  initialComments: Comment[];
}

const CommentList = ({ initialComments }: CommentListProps) => {
  const [comments, setComments] = useState(initialComments || []);

  console.log(comments);

  // 댓글 수정 로직을 처리하는 함수
  const handleEditComment = (commentId: number, newContent: string) => {
    // TODO: 여기에 실제 API 호출 로직 (서버에 댓글 수정 요청)
    console.log(
      `[CommentList] 댓글 ID: ${commentId}, 새로운 내용: "${newContent}" 수정 요청`
    );

    // API 호출 성공 시, 상태 업데이트
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId ? { ...comment, content: newContent } : comment
      )
    );
  };

  // 댓글 삭제 로직을 처리하는 함수
  const handleDeleteComment = (commentId: number) => {
    // TODO: 여기에 실제 API 호출 로직 (서버에 댓글 삭제 요청)
    console.log(`[CommentList] 댓글 ID: ${commentId} 삭제 요청`);

    // API 호출 성공 시, 상태 업데이트
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId)
    );
  };

  if (comments.length === 0) {
    return (
      <div className="my-100 flex flex-col gap-32 self-center text-center">
        <Image
          alt="empty-list"
          className="self-center"
          height={120}
          src="/icons/empty-list.svg"
          width={120}
        />
        <div>
          <p className="mb-1 text-gray-500">등록된 댓글이 없어요</p>
          <p className="text-sm text-gray-400">댓글을 등록해서 소통해주세요</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-16 space-y-1">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
        />
      ))}
    </div>
  );
};

export default CommentList;
