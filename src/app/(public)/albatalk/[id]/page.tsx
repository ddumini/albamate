import AlbatalkDetail from '@/features/albatalk/components/albatalk-detail';

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params;
  return <AlbatalkDetail albatalkId={id} />;
};

export default Page;
