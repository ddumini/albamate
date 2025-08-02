import { useRouter } from 'next/navigation';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import { cn } from '@/shared/lib/cn';

interface AddtalkButtonsProps {
  className?: string;
  isEditMode?: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

const AddtalkButtons = ({
  className,
  isEditMode = false,
  isSubmitting = false,
  onSubmit,
}: AddtalkButtonsProps) => {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/albatalk');
  };

  let label;
  if (isSubmitting) {
    label = isEditMode ? '수정 중...' : '등록 중...';
  } else {
    label = isEditMode ? '수정하기' : '등록하기';
  }

  return (
    <div className={cn('flex flex-col gap-8 md:flex-row lg:gap-12', className)}>
      <PrimaryButton
        className="h-58 w-full md:h-46 md:w-108 lg:h-58 lg:w-180"
        disabled={isSubmitting}
        label="취소"
        type="button"
        variant="cancelSolid"
        onClick={handleCancel}
      />
      <PrimaryButton
        className="h-58 w-full md:h-46 md:w-108 lg:h-58 lg:w-180"
        label={label}
        type="button"
        variant="solid"
        onClick={onSubmit}
      />
    </div>
  );
};
export default AddtalkButtons;
