import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface OwnerButtonsProps {
  isSmall: boolean;
  onDelete: () => void;
  onModify: () => void;
}

function OwnerButtons({ isSmall, onDelete, onModify }: OwnerButtonsProps) {
  return (
    <>
      <PrimaryButton
        aria-label="삭제하기"
        className={`flex ${isSmall ? 'w-1/4' : 'max-w-[640px]'} justify-center py-20 text-lg`}
        iconSrc="/icons/trash-can.svg"
        label={isSmall ? '' : '삭제하기'}
        type="button"
        variant="outline"
        onClick={onDelete}
      />
      <PrimaryButton
        className={`flex ${isSmall ? 'w-3/4' : 'max-w-[640px]'} justify-center py-20 text-lg`}
        iconSrc="/icons/edit.svg"
        label="수정하기"
        type="button"
        variant="solid"
        onClick={onModify}
      />
    </>
  );
}

export default OwnerButtons;
