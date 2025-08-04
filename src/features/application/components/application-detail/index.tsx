'use client';

import PrimaryButton from '@common/button/PrimaryButton';
import { Slide } from '@common/imageCarousel/carousel';
import ImageCarousel from '@common/imageCarousel/ImageCarousel';
import { useRouter } from 'next/navigation';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import AlbaDetail from '@/shared/components/alba/AlbaDetail';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import useApplicationStore from '@/shared/store/useApplicationStore';
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
  const router = useRouter();

  const {
    isOwner,
    isApplicant,
    isAuthenticated,
    isLoading: sessionLoading,
    user,
  } = useSessionUtils();

  const { guestApplication, isGuestMode } = useApplicationStore();

  const {
    data: albaformData,
    isLoading: albaLoading,
    error: albaError,
  } = useAlbaformDetailQuery(formId);

  const {
    data: myApplicationData,
    isLoading: myAppLoading,
    error: myAppError,
  } = useMyApplicationQuery(formId, {
    enabled: isApplicant && isAuthenticated,
  });

  const {
    data: ownerApplicationData,
    isLoading: ownerAppLoading,
    error: ownerAppError,
  } = useApplicationByIdQuery(applicationId, {
    enabled: isOwner && isAuthenticated && !!applicationId,
  });

  let applicationData;
  let appLoading;
  let appError;

  if (isGuestMode) {
    applicationData = guestApplication;
    appLoading = false;
    appError = false;
  } else if (isApplicant) {
    applicationData = myApplicationData;
    appLoading = myAppLoading;
    appError = myAppError;
  } else {
    applicationData = ownerApplicationData;
    appLoading = ownerAppLoading;
    appError = ownerAppError;
  }

  // 초기 렌더링 처리
  const isInitialRender =
    !sessionLoading &&
    !albaLoading &&
    !appLoading &&
    !isAuthenticated &&
    !isOwner &&
    !isApplicant &&
    !isGuestMode;

  const isLoading =
    sessionLoading || albaLoading || appLoading || isInitialRender;

  // 1. 로딩
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 2. 알바 폼 로드 에러
  if (albaError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">오류가 발생했습니다</h1>
        <p className="text-gray-600">알바 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 3. 로그인 안됨 & 게스트 아님
  if (!isAuthenticated && !isGuestMode) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          로그인이 필요합니다
        </h1>
        <p className="text-gray-600">지원서를 확인하려면 로그인해주세요.</p>
      </div>
    );
  }

  // 4. 알바 폼 없음
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

  // 5. 지원 내역 없음 (지원자)
  if (isApplicant && (appError || !applicationData)) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          지원 내역이 없습니다
        </h1>
        <p className="text-gray-600">아직 이 알바에 지원하지 않았습니다.</p>
        <PrimaryButton
          className="p-15"
          label="알바 상세로 돌아가기"
          type="button"
          variant="solid"
          onClick={() => router.push(`/alba/${formId}`)}
        />
      </div>
    );
  }

  // 6. 지원서 없음 (사장님)
  if (isOwner && !applicationData) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          지원서를 찾을 수 없습니다
        </h1>
        <p className="text-gray-600">요청하신 지원서가 존재하지 않습니다.</p>
      </div>
    );
  }

  // 7. 일반 에러
  if (!applicationData) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          데이터를 불러올 수 없습니다
        </h1>
        <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  // 8. 사장님 접근 제한
  if (isOwner && Number(albaformData.ownerId) !== Number(user?.id)) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">
          접근 권한이 없습니다
        </h1>
        <p className="text-gray-600">
          본인이 작성한 공고의 지원서만 확인할 수 있습니다.
        </p>
        <PrimaryButton
          className="p-15"
          label="내 공고 목록으로 돌아가기"
          type="button"
          variant="solid"
          onClick={() => router.push('/myalbalist')}
        />
      </div>
    );
  }

  // 9. 지원자 접근 제한
  if (
    isApplicant &&
    applicationData &&
    Number(applicationData.applicantId) !== Number(user?.id)
  ) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">
          접근 권한이 없습니다
        </h1>
        <p className="text-gray-600">본인의 지원서만 확인할 수 있습니다.</p>
        <PrimaryButton
          className="p-15"
          label="내 지원 목록으로 돌아가기"
          type="button"
          variant="solid"
          onClick={() => router.push('/myalbalist')}
        />
      </div>
    );
  }

  const images =
    albaformData.imageUrls?.length > 0
      ? albaformData.imageUrls
      : ['/images/list-default.png'];
  const carouselSlides: Slide[] = createSlidesFromUrls(images);

  // 최종 렌더링
  return (
    <div className="mx-auto flex w-full max-w-375 min-w-320 flex-col gap-40 py-40 text-sm lg:max-w-7xl lg:gap-80 lg:text-lg">
      <ImageCarousel showCounter interval={4000} slides={carouselSlides} />

      <div className="space-y-40 lg:grid lg:grid-cols-2 lg:gap-150 lg:space-y-0">
        <div className="space-y-40">
          <AlbaDetail item={albaformData} />
          <AlbaDescription description={albaformData.description} />
        </div>
        <div>
          <ApplicationState
            applicationId={applicationData.id}
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
