'use client';
import { useState } from 'react';

import { CommentsResponse } from '../../schemas/albatalk.schema';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import CommentStatus from './CommentStatus';

interface CommentSectionProps {
  postId: number;
  initialComments: CommentsResponse;
}

const CommentSection = ({ postId, initialComments }: CommentSectionProps) => {
  const [comments, setComments] = useState(initialComments);
  return (
    <div className="flex flex-col gap-24 lg:gap-40">
      <CommentStatus count={initialComments.totalItemCount} />
      <CommentForm postId={postId} />
      <CommentList initialComments={comments.data} />
    </div>
  );
};

export default CommentSection;
