import ApplyForm from '@/features/apply/components/ApplyForm';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import InnerContainer from '@/shared/components/container/InnerContainer';

const ApplyPage = async ({
  params,
}: {
  params: Promise<{ formId: string }>;
}) => {
  const { formId } = await params;
  return (
    <section className="pb-68">
      <h1 className="sr-only">알바메이트 지원하기 페이지</h1>
      <InnerContainer size="sm">
        <div className="flex items-center justify-between py-20 lg:mt-40 lg:pt-75 lg:pb-35">
          <h2 className="text-xl font-semibold lg:text-3xl">
            알바메이트 지원하기
          </h2>
          <PrimaryButton
            disabled
            className="h-40 w-80 text-lg font-semibold lg:h-56 lg:w-122 lg:text-xl"
            label="작성 취소"
            type="button"
            variant="solid"
          />
        </div>
        <ApplyForm formId={formId} />
      </InnerContainer>
    </section>
  );
};

export default ApplyPage;
