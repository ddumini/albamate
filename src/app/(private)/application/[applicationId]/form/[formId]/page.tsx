import ApplicationDetail from '@/features/application/components/application-detail';

interface ApplicationFormDetailProps {
  params: Promise<{ applicationId: string; formId: string }>;
}

/**
 * 사장님이 확인 가능한 지원내역 상세페이지
 */
const ApplicationFormDetail = async ({
  params,
}: ApplicationFormDetailProps) => {
  const { applicationId, formId } = await params;

  return (
    <div className="container mx-auto py-6">
      <ApplicationDetail applicationId={applicationId} formId={formId} />
    </div>
  );
};

export default ApplicationFormDetail;
