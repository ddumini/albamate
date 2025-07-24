'use client';

import React, { useState } from 'react';

interface AlbaDescriptionProps {
  description: string;
}

const AlbaDescription: React.FC<AlbaDescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-375 min-w-320 text-sm lg:max-w-770 lg:text-2lg">
      <p
        className={`overflow-hidden text-ellipsis whitespace-pre-line ${
          expanded ? '' : 'line-clamp-7' // Tailwind CSS line-clamp 유틸리티 사용
        }`}
      >
        {description}
      </p>

      {/* 더보기 / 접기 버튼 */}
      <button
        className="mt-8 text-mint-400 hover:underline"
        type="button"
        onClick={() => setExpanded(prev => !prev)}
      >
        {expanded ? '접기' : '더보기'}
      </button>
    </div>
  );
};

export default AlbaDescription;
