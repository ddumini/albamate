'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import PrivateWrapper from '@common/PrivateWrapper';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useAuthSession } from '@/features/auth';
import type { AlbaItem } from '@/shared/types/alba';

import useAlbaListApi from '../api/albaListApi';

interface Props {
  item: AlbaItem & { isScrapped?: boolean }; // isScrapped가 있을 경우 타입 추가
}

const AlbaCard = ({ item }: Props) => {
  const router = useRouter();
  const isAuthenticated = useAuthSession();

  const { scrapAlba, cancelScrapAlba } = useAlbaListApi();

  const [isp, setIsp] = useState(false); // PrivateWrapper 제어용
  const [isLoading, setIsLoading] = useState(false);
  const [isScrapped, setIsScrapped] = useState(!!item.isScrapped);

  const toggleScrap = useCallback(async () => {
    if (isLoading) return; // 요청 중이면 무시

    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }

    setIsLoading(true);
    try {
      if (isScrapped) {
        await cancelScrapAlba(item.id);
        setIsScrapped(false);
        alert(`${item.title} 스크랩 취소 완료!`);
      } else {
        await scrapAlba(item.id);
        setIsScrapped(true);
        alert(`${item.title} 스크랩 완료!`);
      }
    } catch (error) {
      alert('요청 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    isScrapped,
    isLoading,
    isAuthenticated,
    router,
    scrapAlba,
    cancelScrapAlba,
    item.id,
    item.title,
  ]);

  const applyScrapOptions = [
    {
      label: '지원하기',
      onClick: () => router.push(`/apply/${item.id}`),
    },
    {
      label: isScrapped ? '스크랩 취소' : '스크랩',
      onClick: toggleScrap,
      disabled: isLoading,
    },
  ];

  const handleCardClick = () => {
    router.push(`/alba/${item.id}`);
  };

  return (
    <PrivateWrapper isPrivate={isp}>
      <AlbaCardItem
        dropdownOptions={applyScrapOptions}
        item={item}
        onClick={handleCardClick}
      />
    </PrivateWrapper>
  );
};

export default AlbaCard;
