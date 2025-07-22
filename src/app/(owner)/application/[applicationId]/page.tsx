import ApplicationDetail from '@/features/apply/components/apply-detail';
import mockApplyDetail from '@/features/apply/mocks/mockApplyDetail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ApplicationDetail applyResponse={mockApplyDetail} />;
};

export default Page;
