import { Metadata } from 'next';

import AddformClient from '@/features/owner/addform/components/AddformClient';

const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { formId?: string };
}): Promise<Metadata> => {
  if (searchParams.formId) {
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
  searchParams: { formId?: string };
}) => {
  return <AddformClient formId={searchParams.formId} />;
};
export default AddformPage;
