'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useEffect, useState } from 'react';

import AlbaFilterBar from '@/features/albalist/components/AlbaFilterBar';
import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { cn } from '@/shared/lib/cn';

import { applicantMyAlbaMock } from '../mock/applicantMyAlbaList';
import type { User } from '../types/myalbalist';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import MyAlbaCard from './MyAlbaCard';

const AlbaListPage = () => {
  const [albaList, setAlbaList] = useState<
    ApplicantMyAlbaItem[] | OwnerMyAlbaItem[]
  >([]);
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   setAlbaList(ownerMyAlbaMock);
  //   setUser({ role: 'OWNER' });
  // }, []);

  useEffect(() => {
    setAlbaList(applicantMyAlbaMock);
    setUser({ role: 'APPLICANT' });
  }, []);

  const isOwner = user?.role === 'OWNER';

  return (
    <div className="mb-68">
      <AlbaFilterBar isOwner={isOwner} />
      <ListWrapper
        className={cn(!isOwner && '!gap-y-10 md:!gap-y-20 lg:!gap-y-40')}
        items={albaList as (ApplicantMyAlbaItem | OwnerMyAlbaItem)[]}
        renderItem={item => (
          <MyAlbaCard key={`${item.id}`} isOwner={isOwner} item={item} />
        )}
      >
        {isOwner && <FloatingFormButton />}
      </ListWrapper>
    </div>
  );
};

export default AlbaListPage;
