'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import PrivateWrapper from '@common/PrivateWrapper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { usePopupStore } from '@/shared/store/popupStore';
import useModalStore from '@/shared/store/useModalStore';

import { useDeleteFormMutation } from '../queries/queries';
import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import ApplicantAlbaCard from './ApplicantAlbaCard';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Props {
  item: ApplicantMyAlbaItem | OwnerMyAlbaItem;
  isOwner: boolean;
}

const MyAlbaCard = ({ item, isOwner }: Props) => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { showPopup } = usePopupStore();
  const deleteFormMutation = useDeleteFormMutation();

  const [isp, setIsp] = useState(false);

  const isOwnerItem = (
    item: ApplicantMyAlbaItem | OwnerMyAlbaItem
  ): item is OwnerMyAlbaItem => {
    return 'title' in item;
  };

  const applyScrapOptions = [
    {
      label: '수정하기',
      onClick: () => {
        const formId = isOwnerItem(item)
          ? item.id
          : (item as ApplicantMyAlbaItem).form.id;
        router.push(`/addform?formId=${formId}`);
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        if (isOwnerItem(item)) {
          openModal(
            <DeleteConfirmModal
              isPending={deleteFormMutation.isPending}
              title={item.title}
              onConfirm={() => handleDeleteForm(item.id)}
            />
          );
        }
      },
    },
  ];

  const handleDeleteForm = async (formId: number) => {
    try {
      await deleteFormMutation.mutateAsync(formId);
      showPopup('알바폼이 성공적으로 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('알바폼 삭제 실패:', error);
      showPopup('삭제 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
    }
  };

  const handleCardClick = () => {
    if (isOwner) {
      // 사장님: 알바 상세 페이지로 이동
      router.push(`/alba/${item.id}`);
    } else {
      // 지원자: 내 지원서 상세 페이지로 이동
      const applicantItem = item as ApplicantMyAlbaItem;
      router.push(`/myapply/${applicantItem.form.id}`);
    }
  };

  return (
    <PrivateWrapper isPrivate={isp}>
      {isOwner ? (
        <AlbaCardItem
          dropdownOptions={applyScrapOptions}
          item={item as OwnerMyAlbaItem}
          onClick={handleCardClick}
        />
      ) : (
        <ApplicantAlbaCard
          item={item as ApplicantMyAlbaItem}
          onClick={handleCardClick}
        />
      )}
    </PrivateWrapper>
  );
};

export default MyAlbaCard;
