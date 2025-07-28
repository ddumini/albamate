'use client';

import AlbaCardItem from '@common/list/AlbaCardItem';
import PrivateWrapper from '@common/PrivateWrapper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AlbaItem } from '@/shared/types/alba';

interface Props {
  item: AlbaItem;
}

const AlbaCard = ({ item }: Props) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부
  const [isp, setIsp] = useState(false); // PrivateWrapper 제어용 비공개 상태

  const applyScrapOptions = [
    {
      label: '지원하기',
      onClick: () => router.push(`/apply/${item.id}`),
    },
    {
      label: '스크랩',
      onClick: () => {
        if (isLoggedIn) {
          alert(`${item.title} 스크랩 완료!`);
        } else {
          router.push('/signin');
        }
      },
    },
  ];

  const handleCardClick = () => {
    router.push(`/alba/${item.id}`);
  };

  return (
    <PrivateWrapper isPrivate={isp}>
      <AlbaCardItem
        dropdownOptions={applyScrapOptions}
        item={item}
        onClick={handleCardClick}
      />
    </PrivateWrapper>
  );
};

export default AlbaCard;
