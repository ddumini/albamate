import React from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface AlbaApplyButtonTabletProps {
  isOwner: boolean;
}

const ApplyButtonTablet: React.FC<AlbaApplyButtonTabletProps> = ({
  isOwner,
}) => {
  const deleteButtonLabel = ''; // 라벨 제거 (아이콘만 보이도록)

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex gap-10 bg-white/70 px-16 py-12 backdrop-blur lg:hidden dark:bg-gray-900/70">
      <PrimaryButton
        aria-label={isOwner ? '삭제하기' : '내 지원 내역 보기'}
        className="flex max-w-[640px] grow justify-center py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/trash-can.svg' : '/icons/apply-list.svg'}
        label={deleteButtonLabel}
        type="button"
        variant="outline"
      />
      <PrimaryButton
        className="flex max-w-[640px] grow-[3] items-center justify-center py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/edit.svg' : '/icons/writing.svg'}
        label={isOwner ? '수정하기' : '지원하기'}
        type="button"
        variant="solid"
      />
    </div>
  );
};

export default ApplyButtonTablet;
