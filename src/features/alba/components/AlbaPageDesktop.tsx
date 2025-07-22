'use client';

import AlbaDetail from '@alba/AlbaDetail';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';

import AlbaApplyButton from './AlbaApplyButton';
import AlbaCondition from './AlbaCondition';
import AlbaContact from './AlbaContact';
import AlbaInfo from './AlbaInfo';
import AlbaLocation from './AlbaLocation';

interface AlbaPageDesktopProps {
  item: (typeof import('../mocks/mockData').albaMockData)[0];
}

const AlbaPageDesktop = ({ item }: AlbaPageDesktopProps) => {
  return (
    <div className="mx-auto hidden max-w-screen-xl grid-cols-12 gap-42 lg:grid">
      {/* 왼쪽 열 */}
      <div className="col-span-5 flex flex-col gap-32">
        <AlbaDetail item={item} />
        <AlbaDescription description={item.description} />
        <AlbaLocation />
      </div>

      {/* 오른쪽 열 */}
      <div className="col-span-7 flex flex-col justify-end gap-32">
        <AlbaInfo item={item} />
        <AlbaContact item={item} />
        <AlbaApplyButton myId={123} ownerId={item.ownerId} />
        <AlbaCondition item={item} />
      </div>
    </div>
  );
};

export default AlbaPageDesktop;
