'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AlbaDescriptionProps {
  description: string;
}

const AlbaDescription: React.FC<AlbaDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (el) {
      setIsOverflowing(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  return (
    <div className="max-w-375 min-w-320 text-sm lg:max-w-770 lg:text-2lg">
      <p
        ref={paragraphRef}
        className={`overflow-hidden text-ellipsis whitespace-pre-line ${
          expanded ? '' : 'line-clamp-5'
        }`}
      >
        {description}
      </p>

      {isOverflowing && (
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

export default AlbaDescription;
