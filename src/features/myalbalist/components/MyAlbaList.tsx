'use client';

import ListWrapper from '@common/list/ListWrapper';

import AlbaFilterBar from '@/features/albalist/components/AlbaFilterBar';
import FloatingFormButton from '@/features/albalist/components/FloatingFormButton';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { cn } from '@/shared/lib/cn';

import {
  useApplicantMyAlbalistQuery,
  useOwnerMyAlbalistQuery,
} from '../queries/queries';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import MyAlbaCard from './MyAlbaCard';

const AlbaListPage = () => {
  const { isOwner, user, isLoading } = useSessionUtils();

  // 사용자 역할에 따라 다른 쿼리 사용
  const {
    data: applicantData,
    isLoading: isApplicantLoading,
    error: applicantError,
  } = useApplicantMyAlbalistQuery();

  const {
    data: ownerData,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useOwnerMyAlbalistQuery();

  // 현재 사용자 역할에 맞는 데이터 선택
  const currentData = isOwner ? ownerData : applicantData;
  const isLoadingData = isOwner ? isOwnerLoading : isApplicantLoading;
  const error = isOwner ? ownerError : applicantError;

  // 로딩 중일 때 처리
  if (isLoading || isLoadingData) {
    return <div>로딩 중...</div>;
  }

  // 사용자 정보가 없을 때 처리
  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  // 에러 처리
  if (error) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  // 데이터가 배열인지 확인하고 안전하게 처리
  const items = Array.isArray(currentData)
    ? currentData
    : currentData?.data || [];

  console.log('isOwner:', isOwner);
  console.log('currentData:', currentData);
  console.log('items:', items);

  return (
    <div className="mb-68">
      <AlbaFilterBar isOwner={isOwner} />
      <ListWrapper
        className={cn(!isOwner && '!gap-y-10 md:!gap-y-20 lg:!gap-y-40')}
        items={items}
        renderItem={(item: ApplicantMyAlbaItem | OwnerMyAlbaItem) => (
          <MyAlbaCard key={`${item.id}`} isOwner={isOwner} item={item} />
        )}
      >
        {isOwner && <FloatingFormButton />}
      </ListWrapper>
    </div>
  );
};

export default AlbaListPage;
