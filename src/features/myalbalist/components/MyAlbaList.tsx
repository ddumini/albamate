'use client';

import ListWrapper from '@common/list/ListWrapper';
import { useEffect, useState } from 'react';

import AlbaFilterBar from '@/features/albalist/components/AlbaFilterBar';
import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { cn } from '@/shared/lib/cn';

import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import MyAlbaCard from './MyAlbaCard';

const AlbaListPage = () => {
  const { isOwner, user, isLoading, session } = useSessionUtils();

  // TODO: 실제 API 호출로 교체 필요
  const [albaList, setAlbaList] = useState<
    ApplicantMyAlbaItem[] | OwnerMyAlbaItem[]
  >([]);

  useEffect(() => {
    // TODO: 사용자 역할에 따라 다른 API 호출
    // if (isOwner) {
    //   // 사장님용 API 호출
    // } else {
    //   // 지원자용 API 호출
    // }
  }, [isOwner]);

  // 로딩 중일 때 처리(추후 추가 구현 필요)
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 사용자 정보가 없을 때 처리(추후 추가 구현 필요)
  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

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
