import React from 'react';

import { MockAlbaItem } from '../types/MockAlbaItem';

interface AlbaConditionProps {
  item: MockAlbaItem;
}

const AlbaCondition: React.FC<AlbaConditionProps> = ({ item }) => {
  const conditions = [
    { label: '모집인원', value: `${item.numberOfPositions}명` },
    { label: '성별', value: item.gender },
    { label: '학력', value: item.education },
    { label: '연령', value: `${item.age}세` },
    { label: '우대사항', value: item.preferred },
  ];

  return (
    <div className="max-w-640 lg:flex lg:flex-col lg:gap-24">
      <div className="py-16 text-2lg font-bold lg:text-[26px]">모집 조건</div>
      <div className="flex flex-col gap-16 rounded-lg border border-gray-50 bg-gray-25 px-16 py-10 text-neutral-900 lg:p-24">
        {conditions.map(cond => (
          <div key={cond.label} className="grid grid-cols-[1fr_3fr]">
            <span className="text-gray-600">{cond.label}</span>
            <span>{cond.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbaCondition;
