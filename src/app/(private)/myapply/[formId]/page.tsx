import ApplicationDetail from '@/features/application/components/application-detail';

interface MyApplicationDetailPageProps {
  params: Promise<{ formId: string }>;
}

const MyApplicationDetailPage = async ({
  params,
}: MyApplicationDetailPageProps) => {
  const { formId } = await params;

  return <ApplicationDetail formId={formId} />;
};

export default MyApplicationDetailPage;
