'use client';

import React from 'react';

interface AlbaDescriptionProps {
  description: string;
}

/**
 * 알바 상세 설명을 출력하는 독립 컴포넌트입니다.
 *
 * 줄바꿈 유지 및 적절한 가로 너비 제한을 포함합니다.
 *
 * @component
 * @param {AlbaDescriptionProps} props
 * @param {string} props.description - 알바 상세 설명
 *
 * @example
 * <AlbaDescription description={item.description} />
 */
const AlbaDescription: React.FC<AlbaDescriptionProps> = ({ description }) => {
  return (
    <div className="max-w-375 min-w-320 text-sm whitespace-pre-line lg:max-w-770 lg:text-2lg">
      {description}
    </div>
  );
};

export default AlbaDescription;
