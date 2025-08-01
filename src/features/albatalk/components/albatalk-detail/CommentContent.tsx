'use client';

import { useState } from 'react';

interface CommentContentProps {
  content: string;
  className?: string;
}

const CommentContent = ({ content, className = '' }: CommentContentProps) => {
  const [expanded, setExpanded] = useState(false);

  const isLongComment = content.length > 100 || content.split('\n').length > 3;

  return (
    <div className={className}>
      <p
        className={`break-words whitespace-pre-wrap ${
          expanded ? '' : 'line-clamp-3'
        }`}
      >
        {content}
      </p>

      {isLongComment && (
        <button
          className="mt-8 text-mint-400 hover:underline"
          type="button"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default CommentContent;
