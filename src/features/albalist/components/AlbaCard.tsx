'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { useAuthSession } from '@/features/auth';
import type { AlbaItem } from '@/shared/types/alba';

import useAlbaListApi from '../api/albaListApi';

interface Props {
  item: AlbaItem & { isScrapped?: boolean };
}

const AlbaCard = ({ item }: Props) => {
  const router = useRouter();
  const { isAuthenticated, refreshSession } = useAuthSession();
  const { scrapAlba, cancelScrapAlba, getAlbaDetail } = useAlbaListApi();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isScrapped, setIsScrapped] = useState(item.isScrapped ?? false);

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
      // 세션 강제 갱신 시도
      try {
        await refreshSession();
      } catch (refreshError) {
        console.warn('세션 갱신 실패. 로그아웃을 진행합니다.');
        signOut({ callbackUrl: '/signin', redirect: true });
        return;
      }

      if (isScrapped) {
        await cancelScrapAlba(item.id);
        setIsScrapped(false);
        alert(`${item.title} 스크랩 취소 완료!`);
      } else {
        try {
          await scrapAlba(item.id);
          setIsScrapped(true);
          alert(`${item.title} 스크랩 완료!`);
        } catch (error: any) {
          if (
            error?.response?.data?.message === '이미 스크랩한 알바폼입니다.'
          ) {
            await cancelScrapAlba(item.id);
            setIsScrapped(false);
            alert(`${item.title} 스크랩 취소 완료!`);
          } else {
            throw error;
          }
        }
      }

      queryClient.invalidateQueries({ queryKey: ['albaList'] });
      queryClient.invalidateQueries({ queryKey: ['albaDetail', item.id] });
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        alert('요청 중 오류가 발생했습니다.');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoading,
    isAuthenticated,
    item.id,
    item.title,
    isScrapped,
    router,
    scrapAlba,
    cancelScrapAlba,
    queryClient,
    refreshSession, // 추가
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
      isScrapped={isScrapped}
      item={item}
      onClick={handleCardClick}
    />
  );
};

export default AlbaCard;
