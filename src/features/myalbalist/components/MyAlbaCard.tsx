'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import PrivateWrapper from '@common/PrivateWrapper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ApplicantMyAlbaItem, OwnerMyAlbaItem } from '../types/myalbalist';
import ApplicantAlbaCard from './ApplicantAlbaCard';

interface Props {
  item: ApplicantMyAlbaItem | OwnerMyAlbaItem;
  isOwner: boolean;
}

const MyAlbaCard = ({ item, isOwner }: Props) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [isp, setIsp] = useState(false); // PrivateWrapper 제어용 비공개 상태

  const isOwnerItem = (
    item: ApplicantMyAlbaItem | OwnerMyAlbaItem
  ): item is OwnerMyAlbaItem => {
    return 'title' in item;
  };

  const applyScrapOptions = [
    {
      label: '수정하기',
      onClick: () => {
        // TODO: 수정로직 구현
        const title = isOwnerItem(item) ? item.title : '';
        alert(`${title} 수정 완료!`);
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        // TODO: 삭제로직 구현
        const title = isOwnerItem(item) ? item.title : '';
        alert(`${title} 삭제 완료!`);
      },
    },
  ];

  const handleCardClick = () => {
    // 사용자 역할에 따라 다른 경로로 이동
    if (isOwner) {
      // 사장님은 자신의 폼 상세 페이지로
      router.push(`/albalist/${item.id}`);
    } else {
      // 지원자는 지원한 폼의 상세 페이지로
      const applicantItem = item as ApplicantMyAlbaItem;
      router.push(`/albalist/${applicantItem.form.id}`);
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
