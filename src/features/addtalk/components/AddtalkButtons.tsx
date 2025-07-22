import Link from 'next/link';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import { cn } from '@/shared/lib/cn';

const AddtalkButtons = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex flex-col gap-8 md:flex-row lg:gap-12', className)}>
      <Link href="/albatalk">
        <PrimaryButton
          className="h-58 w-full md:h-46 md:w-108 lg:h-58 lg:w-180"
          label="취소"
          type="button"
          variant="cancelSolid"
        />
      </Link>
      <PrimaryButton
        className="h-58 w-full md:h-46 md:w-108 lg:h-58 lg:w-180"
        label="등록하기"
        type="button"
        variant="solid"
      />
    </div>
  );
};
export default AddtalkButtons;
