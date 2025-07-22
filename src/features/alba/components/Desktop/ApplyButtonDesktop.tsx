// AlbaApplyButtonDesktop.tsx
import React from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface AlbaApplyButtonDesktopProps {
  isOwner: boolean;
}

const ApplyButtonDesktop: React.FC<AlbaApplyButtonDesktopProps> = ({
  isOwner,
}) => {
  return (
    <div className="flex flex-col gap-10 py-16">
      <PrimaryButton
        className="flex max-w-[640px] py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/edit.svg' : '/icons/writing.svg'}
        label={isOwner ? '수정하기' : '지원하기'}
        type="button"
        variant="solid"
      />
      <PrimaryButton
        className="max-w-[640px] py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/trash-can.svg' : '/icons/apply-list.svg'}
        label={isOwner ? '삭제하기' : '내 지원 내역 보기'}
        type="button"
        variant="outline"
      />
    </div>
  );
};

export default ApplyButtonDesktop;
