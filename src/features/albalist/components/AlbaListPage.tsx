'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useEffect, useState } from 'react';

import { albaMockData } from '@/features/albalist/mock/mockData';
import type { User } from '@/shared/types/alba';
import { AlbaItem } from '@/shared/types/alba';

import AlbaCard from './AlbaCard';
import AlbaFilterBar from './AlbaFilterBar';
import FloatingFormButton from './FloatingFormButton';

const AlbaListPage = () => {
  const [albaList, setAlbaList] = useState<AlbaItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setAlbaList(albaMockData);
    setUser({ role: 'OWNER' });
  }, []);

  const isOwner = user?.role === 'OWNER';

  return (
    <div className="mb-68">
      <AlbaFilterBar isOwner={isOwner} />
      <ListWrapper
        items={albaList}
        renderItem={item => (
          <AlbaCard key={`${item.id}-${item.recruitmentEndDate}`} item={item} />
        )}
      >
        {isOwner && <FloatingFormButton />}
      </ListWrapper>
    </div>
  );
};

export default AlbaListPage;
