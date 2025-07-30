'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useAuthSession } from '@/features/auth';
import type { AlbaItem } from '@/shared/types/alba';

import useAlbaListApi from '../api/albaListApi';

interface Props {
  item: AlbaItem & { isScrapped?: boolean };
}

const AlbaCard = ({ item }: Props) => {
  const router = useRouter();
  const isAuthenticated = useAuthSession();
  const { scrapAlba, cancelScrapAlba, getAlbaDetail } = useAlbaListApi();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isScrapped, setIsScrapped] = useState(!!item.isScrapped);

  // 카드 클릭 전에 상세 프리패치
  const handleCardClick = async () => {
    try {
      await queryClient.prefetchQuery({
        queryKey: ['albaDetail', item.id],
        queryFn: () => getAlbaDetail(item.id).then(res => res.data),
      });
    } catch (err) {
      console.error('프리패치 실패:', err);
    }
    router.push(`/alba/${item.id}`);
  };

  const toggleScrap = useCallback(async () => {
    if (isLoading) return;

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

      // 상세 페이지 데이터 무효화 → 다음 진입 시 새로 가져옴
      queryClient.invalidateQueries({
        queryKey: ['albaDetail', item.id],
      });
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
    queryClient,
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

  return (
    <AlbaCardItem
      dropdownOptions={applyScrapOptions}
      item={item}
      onClick={handleCardClick}
    />
  );
};

export default AlbaCard;
