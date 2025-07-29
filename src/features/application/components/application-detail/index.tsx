'use client';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import AlbaDetail from '@/shared/components/alba/AlbaDetail';
import ImageCarousel from '@/shared/components/ui/ImageCarousel';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { Slide } from '@/shared/types/carousel';
import { createSlidesFromUrls } from '@/shared/utils/carousel';

import {
  useAlbaformDetailQuery,
  useApplicationByIdQuery,
  useMyApplicationQuery,
} from '../../queries/queries';
import ApplicationProfile from './ApplicationProfile';
import ApplicationState from './ApplicationState';

interface ApplicationDetailProps {
  formId: string;
  applicationId?: string;
}

const ApplicationDetail = ({
  formId,
  applicationId,
}: ApplicationDetailProps) => {
  const {
    isOwner,
    isApplicant,
    isAuthenticated,
    isLoading: sessionLoading,
  } = useSessionUtils();

  // 공통: 알바폼 상세 조회
  const {
    data: albaformData,
    isLoading: albaLoading,
    error: albaError,
  } = useAlbaformDetailQuery(formId);

  // 지원자: 내 지원서 조회
  const {
    data: myApplicationData,
    isLoading: myAppLoading,
    error: myAppError,
  } = useMyApplicationQuery(formId, {
    enabled: isApplicant && isAuthenticated,
  });

  // 사장님용: 특정 지원서 조회
  const {
    data: ownerApplicationData,
    isLoading: ownerAppLoading,
    error: ownerAppError,
  } = useApplicationByIdQuery(applicationId, {
    enabled: isOwner && isAuthenticated && !!applicationId,
  });

  // 최종 데이터 결정
  const applicationData = isApplicant
    ? myApplicationData
    : ownerApplicationData;
  const appLoading = isApplicant ? myAppLoading : ownerAppLoading;
  const appError = isApplicant ? myAppError : ownerAppError;

  // 로딩 처리
  if (sessionLoading || albaLoading || appLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="text-gray-600">데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 인증 확인
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          로그인이 필요합니다
        </h1>
        <p className="text-gray-600">지원서를 확인하려면 로그인해주세요.</p>
      </div>
    );
  }

  // 에러 처리
  if (albaError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">오류가 발생했습니다</h1>
        <p className="text-gray-600">알바 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 알바폼 데이터가 없는 경우
  if (!albaformData) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          알바 정보를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600">요청하신 알바 정보가 존재하지 않습니다.</p>
      </div>
    );
  }

  // 지원서가 없거나 에러인 경우
  if (isApplicant && (appError || !applicationData)) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          지원 내역이 없습니다
        </h1>
        <p className="text-gray-600">아직 이 알바에 지원하지 않았습니다.</p>
        <button
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          type="button"
          onClick={() => (window.location.href = `/alba/${formId}`)}
        >
          알바 상세로 돌아가기
        </button>
      </div>
    );
  }

  // 사장님인데 지원서가 없는 경우
  if (isOwner && (appError || !applicationData)) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          지원서를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600">해당 지원서가 존재하지 않습니다.</p>
        <button
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          type="button"
          onClick={() =>
            (window.location.href = `/owner/${formId}/applications`)
          }
        >
          지원자 목록으로 돌아가기
        </button>
      </div>
    );
  }

  // 이미지 처리
  const images =
    albaformData.imageUrls?.length > 0
      ? albaformData.imageUrls
      : ['/images/list-default.png'];
  const carouselSlides: Slide[] = createSlidesFromUrls(images);

  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-40 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ImageCarousel showCounter interval={4000} slides={carouselSlides} />

      <div className="space-y-40 lg:grid lg:grid-cols-2 lg:gap-150 lg:space-y-0">
        <div className="space-y-40">
          <AlbaDetail item={albaformData} />
          <AlbaDescription description={albaformData.description} />
        </div>
        {/* 지원서 상태 */}
        <div>
          <ApplicationState
            createdAt={applicationData.createdAt}
            recruitmentEndDate={albaformData.recruitmentEndDate}
            status={applicationData.status}
          />
        </div>
      </div>
      <div className="border-4 border-line-100 dark:border-gray-800" />

      <ApplicationProfile data={applicationData} />
    </div>
  );
};

export default ApplicationDetail;
