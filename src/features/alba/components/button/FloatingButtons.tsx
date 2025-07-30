'use client';

import FloatingButton from '@common/button/FloatingButton';
import FloatingButtonContainer from '@common/button/FloatingButtonContainer';
import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import useAlbaListApi from '@/features/albalist/api/albaListApi';
import { useAuthSession } from '@/features/auth';

interface Props {
  onToggleOwner: () => void;
  formId: number;
  onSigninRedirect: () => void;
}

const FloatingButtons = ({
  onToggleOwner,
  formId,
  onSigninRedirect,
}: Props) => {
  const { isAuthenticated, refreshSession } = useAuthSession();
  const { scrapAlba, cancelScrapAlba } = useAlbaListApi();
  const queryClient = useQueryClient();

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 알바 상세 데이터에서 스크랩 상태 확인
  useEffect(() => {
    const albaDetailData = queryClient.getQueryData(['albaDetail', formId]);
    if (
      albaDetailData &&
      typeof albaDetailData === 'object' &&
      'isScrapped' in albaDetailData
    ) {
      setIsBookmarked(Boolean(albaDetailData.isScrapped));
    }
  }, [formId, queryClient]);

  const handleBookmarkToggle = useCallback(async () => {
    if (!isAuthenticated) {
      onSigninRedirect();
      return;
    }

    if (isLoading) return;

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

      if (isBookmarked) {
        // 스크랩 취소
        await cancelScrapAlba(formId);
        setIsBookmarked(false);
        alert('스크랩을 취소했어요.');
      } else {
        // 스크랩 시도
        try {
          await scrapAlba(formId);
          setIsBookmarked(true);
          alert('스크랩했어요!');
        } catch (error: any) {
          if (
            error?.response?.data?.message === '이미 스크랩한 알바폼입니다.'
          ) {
            // 실제로는 이미 스크랩된 상태이므로 취소 동작 수행
            await cancelScrapAlba(formId);
            setIsBookmarked(false);
            alert('스크랩을 취소했어요.');
          } else {
            throw error;
          }
        }
      }

      // 관련 쿼리들 무효화하여 데이터 동기화
      queryClient.invalidateQueries({ queryKey: ['albaList'] });
      queryClient.invalidateQueries({ queryKey: ['albaDetail', formId] });

      // 알바 상세 데이터의 스크랩 상태도 즉시 업데이트
      queryClient.setQueryData(['albaDetail', formId], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            isScrapped: !isBookmarked,
            scrapCount: isBookmarked
              ? Math.max(0, oldData.scrapCount - 1)
              : oldData.scrapCount + 1,
          };
        }
        return oldData;
      });
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        alert('요청 중 오류가 발생했습니다.');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    isAuthenticated,
    isLoading,
    isBookmarked,
    formId,
    onSigninRedirect,
    refreshSession,
    scrapAlba,
    cancelScrapAlba,
    queryClient,
  ]);

  return (
    <FloatingButtonContainer position="right-center">
      <FloatingButton
        isBookmarked={isBookmarked}
        type="bookmark"
        onClick={handleBookmarkToggle}
      />
      <FloatingButton type="share" />
      <FloatingButton type="addAlbatalk" onClick={onToggleOwner} />
    </FloatingButtonContainer>
  );
};

export default FloatingButtons;
