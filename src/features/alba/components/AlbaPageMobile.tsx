'use client';

import AlbaDetail from '@alba/AlbaDetail';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';

import AlbaApplyButton from './AlbaApplyButton';
import AlbaCondition from './AlbaCondition';
import AlbaContact from './AlbaContact';
import AlbaInfo from './AlbaInfo';
import AlbaLocation from './AlbaLocation';

interface AlbaPageMobileProps {
  item: (typeof import('../mocks/mockData').albaMockData)[0];
}

const AlbaPageMobile = ({ item }: AlbaPageMobileProps) => {
  return (
    <div className="flex flex-col gap-32 lg:hidden">
      <AlbaDetail item={item} />
      <AlbaInfo item={item} />
      <AlbaContact item={item} />
      <AlbaDescription description={item.description} />
      <AlbaCondition item={item} />
      <AlbaLocation />
      <AlbaApplyButton myId={123} ownerId={item.ownerId} />
    </div>
  );
};

export default AlbaPageMobile;
