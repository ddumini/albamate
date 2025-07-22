'use client';

import AlbaDetail from '@alba/AlbaDetail';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';

import { albaMockData } from '../../mocks/mockData';
import AlbaCondition from '../AlbaCondition';
import AlbaContact from '../AlbaContact';
import AlbaInfo from '../AlbaInfo';
import AlbaLocation from '../AlbaLocation';
import ApplyButtonTablet from './ApplyButtonTablet';

interface AlbaPageTabletProps {
  item: (typeof albaMockData)[0];
  isOwner: boolean;
}

const AlbaPageTablet = ({ item, isOwner }: AlbaPageTabletProps) => {
  return (
    <div className="flex flex-col gap-32">
      <AlbaDetail item={item} />
      <AlbaInfo item={item} />
      <AlbaContact item={item} />
      <AlbaDescription description={item.description} />
      <AlbaCondition item={item} />
      <AlbaLocation />
      <ApplyButtonTablet isOwner={isOwner} />
    </div>
  );
};

export default AlbaPageTablet;
