'use client';

import React from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useModalStore from '@/shared/store/useModalStore';

import ApplicationListModal from '../modal/ApplicationListModal';
import FormDeleteModal from '../modal/FormDeleteModal';

interface AlbaApplyButtonTabletProps {
  isOwner: boolean;
}

const ApplyButtonTablet: React.FC<AlbaApplyButtonTabletProps> = ({
  isOwner,
}) => {
  const { openModal } = useModalStore();
  const deleteButtonLabel = ''; // 아이콘만 보이게

  const handleOpenApplicationModal = () => {
    openModal(<ApplicationListModal />);
  };

  const handleOpenFormDeleteModal = () => {
    openModal(<FormDeleteModal />);
  };

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-white/70 px-16 py-12 backdrop-blur lg:hidden dark:bg-gray-900/70">
      {isOwner ? (
        <div className="flex gap-10">
          <PrimaryButton
            aria-label="삭제하기"
            className="flex w-1/4 max-w-[640px] justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/trash-can.svg"
            label={deleteButtonLabel}
            type="button"
            variant="outline"
            onClick={handleOpenFormDeleteModal}
          />
          <PrimaryButton
            className="flex w-3/4 max-w-[640px] items-center justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/edit.svg"
            label="수정하기"
            type="button"
            variant="solid"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <PrimaryButton
            className="flex w-full items-center justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/writing.svg"
            label="지원하기"
            type="button"
            variant="solid"
          />
          <PrimaryButton
            aria-label="내 지원 내역 보기"
            className="flex w-full justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/apply-list.svg"
            label="내 지원 내역 보기"
            type="button"
            variant="outline"
            onClick={handleOpenApplicationModal}
          />
        </div>
      )}
    </div>
  );
};

export default ApplyButtonTablet;
