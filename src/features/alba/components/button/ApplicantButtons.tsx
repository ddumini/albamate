import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface ApplicantButtonsProps {
  isSmall: boolean;
  onApply: () => void;
  onViewApplication: () => void;
}

const ApplicantButtons = ({
  isSmall,
  onApply,
  onViewApplication,
}: ApplicantButtonsProps) => (
  <>
    <PrimaryButton
      className={`flex ${isSmall ? 'w-full' : 'max-w-[640px]'} justify-center py-20 text-lg`}
      iconSrc="/icons/writing.svg"
      label="지원하기"
      type="button"
      variant="solid"
      onClick={onApply}
    />
    <PrimaryButton
      aria-label="내 지원 내역 보기"
      className={`flex ${isSmall ? 'w-full' : 'max-w-[640px]'} justify-center py-20 text-lg`}
      iconSrc="/icons/apply-list.svg"
      label="내 지원 내역 보기"
      type="button"
      variant="outline"
      onClick={onViewApplication}
    />
  </>
);

export default ApplicantButtons;
