import { albaMockData } from '@/features/alba/mocks/mockData';
import ApplicationDetail from '@/features/apply/components/apply-detail';
import mockApplyDetail from '@/features/apply/mocks/mockApplyDetail';

interface MyApplicantDetailPageProps {
  params: Promise<{ formId: string; applicationId: string }>;
}

const MyApplicantDetailPage = async ({
  params,
}: MyApplicantDetailPageProps) => {
  const { formId, applicationId } = await params;
  const albaformData = albaMockData;

  const item = albaformData.find(alba => alba.id === Number(formId));

  if (!item) {
    return (
      <div>
        <h1>알바 정보를 찾을 수 없습니다</h1>
        <p>요청하신 알바 정보가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <ApplicationDetail albaformData={item} applicationData={mockApplyDetail} />
  );
};

export default MyApplicantDetailPage;
