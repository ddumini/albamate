import ApplyForm from '@/features/apply/components/ApplyForm';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import InnerContainer from '@/shared/components/container/InnerContainer';

const ApplyPage = () => {
  return (
    <section>
      <h1 className="sr-only">알바메이트 지원하기 페이지</h1>
      <InnerContainer size="sm">
        <div className="flex items-center justify-between py-20">
          <h2 className="text-xl font-semibold">알바메이트 지원하기</h2>
          <PrimaryButton
            disabled
            className="h-40 w-80"
            label="작성 취소"
            type="button"
            variant="solid"
          />
        </div>
        <ApplyForm />
      </InnerContainer>
    </section>
  );
};

export default ApplyPage;
