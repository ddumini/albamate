'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useModalStore from '@/shared/store/useModalStore';

import ApplicationModal from '../modal/ApplicationModal';
import FormDeleteModal from '../modal/FormDeleteModal';

interface AlbaApplyButtonTabletProps {
  isOwner: boolean;
  itemId: number;
}

const ApplyButtonTablet: React.FC<AlbaApplyButtonTabletProps> = ({
  isOwner,
  itemId,
}) => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const deleteButtonLabel = ''; // 아이콘만 보이게

  const handleApplicationModal = () => {
    openModal(<ApplicationModal itemId={itemId} />);
  };

  const handleFormDeleteModal = () => {
    openModal(<FormDeleteModal />);
  };

  const handleApply = () => {
    router.push(`/apply/${itemId}`);
  };

  const handleModify = () => {
    router.push(`/addform?formId=${itemId}`);
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
            onClick={handleFormDeleteModal}
          />
          <PrimaryButton
            className="flex w-3/4 max-w-[640px] items-center justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/edit.svg"
            label="수정하기"
            type="button"
            variant="solid"
            onClick={handleModify}
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
            onClick={handleApply}
          />
          <PrimaryButton
            aria-label="내 지원 내역 보기"
            className="flex w-full justify-center py-20 text-lg lg:text-xl"
            iconSrc="/icons/apply-list.svg"
            label="내 지원 내역 보기"
            type="button"
            variant="outline"
            onClick={handleApplicationModal}
          />
        </div>
      )}
    </div>
  );
};

export default ApplyButtonTablet;
