import AlbatalkDetail from '@/features/albatalk/components/albatalk-detail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const albatalkId = Number(id);

  if (isNaN(albatalkId) || albatalkId <= 0) {
    throw new Error('유효하지 않은 게시글 ID입니다.');
  }

  return <AlbatalkDetail albatalkId={albatalkId} />;
};

export default Page;
