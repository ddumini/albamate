'use client';

import AlbaDescription from '@alba/AlbaDescription';
import AlbaDetail from '@alba/AlbaDetail';

import AlbaLocation from '@/features/alba/components/AlbaLocation';

import { albaMockData } from '../../mocks/mockData';
import AlbaCondition from '../AlbaCondition';
import AlbaContact from '../AlbaContact';
import AlbaInfo from '../AlbaInfo';
import ApplyButtonDesktop from './ApplyButtonDesktop';

interface AlbaPageDesktopProps {
  item: (typeof albaMockData)[0];
  isOwner: boolean;
}

const AlbaPageDesktop = ({ item, isOwner }: AlbaPageDesktopProps) => {
  return (
    <div className="mx-auto grid grid-cols-12 gap-120">
      {/* 왼쪽 열 */}
      <div className="col-span-6 flex flex-col gap-32">
        <AlbaDetail item={item} />
        <AlbaDescription description={item.description} />
        <AlbaLocation />
      </div>

      {/* 오른쪽 열 */}
      <div className="col-span-6 flex flex-col justify-end gap-32">
        <AlbaInfo item={item} />
        <AlbaContact item={item} />
        <ApplyButtonDesktop isOwner={isOwner} itemId={item.id} />
        <AlbaCondition item={item} />
      </div>
    </div>
  );
};

export default AlbaPageDesktop;
