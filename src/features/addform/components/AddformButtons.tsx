import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import { cn } from '@/shared/lib/cn';

interface AddformButtonsProps {
  isEdit?: boolean;
  className?: string;
}

const AddformButtons = ({ isEdit, className }: AddformButtonsProps) => {
  return isEdit ? (
    <div className={cn('flex flex-col', className)}>
      <PrimaryButton
        className="h-58 text-xl font-semibold lg:h-72"
        label="수정하기"
        type="button"
        variant="solid"
      />
    </div>
  ) : (
    <div className={cn('flex flex-col gap-8', className)}>
      <PrimaryButton
        className="h-58 text-xl font-semibold lg:h-72"
        label="임시 저장"
        type="button"
        variant="outline"
      />
      <PrimaryButton
        className="h-58 text-xl font-semibold lg:h-72"
        label="등록하기"
        type="button"
        variant="solid"
      />
    </div>
  );
};
export default AddformButtons;
