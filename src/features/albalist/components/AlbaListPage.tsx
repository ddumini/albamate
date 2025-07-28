'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useState } from 'react';

import type { User } from '@/shared/types/alba';
import { AlbaItem } from '@/shared/types/alba';

import AlbaCard from './AlbaCard';
import AlbaFilterBar from './AlbaFilterBar';
import FloatingFormButton from './FloatingFormButton';

interface Props {
  data: AlbaItem[];
  user: User | null;
}

const AlbaListPage = ({ data, user }: Props) => {
  const [albaList, setAlbaList] = useState<AlbaItem[]>(data);
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
