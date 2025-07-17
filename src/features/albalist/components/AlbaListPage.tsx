'use client';

import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  useEffect(() => {
    setAlbaList(albaMockData);
    setUser({ role: 'OWNER' }); // 예시용
  }, []);

  const isOwner = user?.role === 'OWNER';

  const handleCardClick = (id: number) => {
    router.push(`/alba/${id}`);
  };

  return (
    <div>
      <AlbaFilterBar isOwner={isOwner} />
      <div className="flex flex-wrap justify-center gap-24 px-24">
        {albaList.map(item => (
          <AlbaCard
            key={item.id}
            item={item}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
        {isOwner && <FloatingFormButton />}
      </div>
    </div>
  );
};

export default AlbaListPage;
