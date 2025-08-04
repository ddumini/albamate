import AddtalkClient from '@/features/albatalk/components/albatalk-form/AddtalkClient';

const AddtalkPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ albatalkId?: string }>;
}) => {
  const { albatalkId } = await searchParams;
  return <AddtalkClient albatalkId={albatalkId} />;
};

export default AddtalkPage;
