import { Metadata } from 'next';

import AddformClient from '@/features/owner/addform/components/AddformClient';

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}): Promise<Metadata> => {
  const formId = (await searchParams).formId;
  if (formId) {
    return {
      title: `알바폼 수정하기`,
      description: `알바폼을 수정하는 페이지입니다.`,
    };
  }

  return {
    title: '새 알바폼 만들기',
    description: '새로운 알바폼을 작성하는 페이지입니다.',
  };
};

const AddformPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ formId?: string }>;
}) => {
  const formId = (await searchParams).formId;
  return <AddformClient formId={formId} />;
};
export default AddformPage;
