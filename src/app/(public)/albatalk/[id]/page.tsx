import AlbatalkDetail from '@/features/albatalk/components/albatalk-detail';
import mockAlbatalkComments from '@/features/albatalk/mocks/mockAlbatalkComments';
import mockAlbatalkDetail from '@/features/albatalk/mocks/mockAlbatalkDetail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const albatalkData = mockAlbatalkDetail;
  const commentsData = mockAlbatalkComments;
  return <AlbatalkDetail comments={commentsData} data={albatalkData} />;
};

export default Page;
