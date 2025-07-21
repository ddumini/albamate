import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

const AlbaApplyButton = () => {
  return (
    <div className="flex flex-col gap-10 py-16">
      <PrimaryButton
        className="flex w-full max-w-640 py-20 text-lg lg:text-xl"
        iconSrc="/icons/writing.svg"
        label="지원하기"
        type="button"
        variant="solid"
      />
      <PrimaryButton
        className="w-full max-w-640 py-20 text-lg lg:text-xl"
        iconSrc="/icons/apply-list.svg"
        label="내 지원 내역 보기"
        type="button"
        variant="outline"
      />
    </div>
  );
};

export default AlbaApplyButton;
