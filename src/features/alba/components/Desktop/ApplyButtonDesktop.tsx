'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useModalStore from '@/shared/store/useModalStore';

import ApplicationListModal from '../modal/ApplicationListModal';
import FormDeleteModal from '../modal/FormDeleteModal';

interface AlbaApplyButtonDesktopProps {
  isOwner: boolean;
  itemId: number; // ✅ 추가
}

const ApplyButtonDesktop: React.FC<AlbaApplyButtonDesktopProps> = ({
  isOwner,
  itemId,
}) => {
  const { openModal } = useModalStore();
  const router = useRouter();

  const handleOpenApplicationModal = () => {
    openModal(<ApplicationListModal />);
  };

  const handleOpenFormDeleteModal = () => {
    openModal(<FormDeleteModal />);
  };

  const handleApply = () => {
    router.push(`/apply/${itemId}`);
  };

  return (
    <div className="flex flex-col gap-10 py-16">
      <PrimaryButton
        className="flex max-w-[640px] py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/edit.svg' : '/icons/writing.svg'}
        label={isOwner ? '수정하기' : '지원하기'}
        type="button"
        variant="solid"
        onClick={isOwner ? undefined : handleApply}
      />
      <PrimaryButton
        className="max-w-[640px] py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/trash-can.svg' : '/icons/apply-list.svg'}
        label={isOwner ? '삭제하기' : '내 지원 내역 보기'}
        type="button"
        variant="outline"
        onClick={
          isOwner ? handleOpenFormDeleteModal : handleOpenApplicationModal
        }
      />
    </div>
  );
};

export default ApplyButtonDesktop;
