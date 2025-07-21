import React from 'react';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaConditionProps {
  item: MockAlbaItem;
}

const AlbaCondition: React.FC<AlbaConditionProps> = ({ item }) => {
  return (
    <div>
      <div className="py-16 text-2lg font-bold lg:text-[26px]">모집 조건</div>
      <div className="flex flex-col gap-2 rounded-lg border border-gray-25 bg-gray-25 px-16 py-10 text-neutral-900">
        <div className="grid grid-cols-[1fr_3fr]">
          <span className="text-gray-600">모집인원</span>
          <span>{item.numberOfPositions}명</span>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <span className="text-gray-600">성별</span>
          <span>{item.gender}</span>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <span className="text-gray-600">학력</span>
          <span>{item.education}</span>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <span className="text-gray-600">연령</span>
          <span>{item.age}세</span>
        </div>
        <div className="grid grid-cols-[1fr_3fr]">
          <span className="text-gray-600">우대사항</span>
          <span>{item.preferred}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbaCondition;
