'use client';

import { useRouter } from 'next/navigation';

import AlbaDescription from '@/shared/components/alba/AlbaDescription';
import AlbaDetail from '@/shared/components/alba/AlbaDetail';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import { Slide } from '@/shared/components/common/imageCarousel/carousel';
import ImageCarousel from '@/shared/components/common/imageCarousel/ImageCarousel';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
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

  // 초기 렌더링 처리
  const isInitialRender =
    !sessionLoading &&
    !albaLoading &&
    !appLoading &&
    !isAuthenticated &&
    !isOwner &&
    !isApplicant;

  const isLoading =
    sessionLoading || albaLoading || appLoading || isInitialRender;

  // 1. 로딩 처리
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
        <p className="text-gray-600">데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 2. 에러 처리 (인증보다 먼저)
  if (albaError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">오류가 발생했습니다</h1>
        <p className="text-gray-600">알바 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // 3. 인증 확인
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

  // 4. 알바폼 데이터 확인
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

  // 5. 지원서 관련 에러 처리
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

  // 6. 사장님인데 지원서 데이터가 없는 경우
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

  // 7. 최종 안전성 체크
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

  // 권한 체크: 사장님인데 본인 공고가 아닌 경우
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

  // 권한 체크: 지원자인데 본인 지원서가 아닌 경우
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

  // 이미지 처리
  const images =
    albaformData.imageUrls?.length > 0
      ? albaformData.imageUrls
      : ['/images/list-default.png'];
  const carouselSlides: Slide[] = createSlidesFromUrls(images);

  // 8. 정상 렌더링
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
