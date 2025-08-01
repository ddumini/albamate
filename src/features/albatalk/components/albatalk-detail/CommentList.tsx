'use client';

import EmptyCard from '@/shared/components/common/EmptyCard';

import {
  useDeleteAlbatalkComment,
  useUpdateAlbatalkComment,
} from '../../hooks/useAlbatalk';
import { Comment } from '../../schemas/albatalk.schema';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  albatalkId: number;
}

const CommentList = ({ comments, albatalkId }: CommentListProps) => {
  const updateCommentMutation = useUpdateAlbatalkComment();
  const deleteCommentMutation = useDeleteAlbatalkComment();

  // 댓글 수정 로직을 처리하는 함수
  const handleEditComment = (commentId: number, newContent: string) => {
    updateCommentMutation.mutate({
      commentId,
      content: newContent,
      postId: albatalkId,
    });
  };

  // 댓글 삭제 로직을 처리하는 함수
  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate({
      commentId,
      postId: albatalkId,
    });
  };

  if (comments.length === 0) {
    return (
      <div className="my-100 flex flex-col gap-32 self-center text-center">
        <EmptyCard type="albaTalkComment" />
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
