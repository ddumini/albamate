'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AlbaCardItem from '@/shared/components/common/list/AlbaCardItem';
import { AlbaItem } from '@/shared/types/alba';

interface Props {
  item: AlbaItem;
}

const AlbaCard = ({ item }: Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 내부에서 로그인 상태 임시 관리

  const applyScrapOptions = [
    { label: '지원하기', onClick: () => router.push(`/apply/${item.id}`) },
    {
      label: '스크랩',
      onClick: () => {
        if (isLoggedIn) {
          // 스크랩 처리 로직 (API 호출 등)
          alert(`${item.title} 스크랩 완료!`);
        } else {
          router.push('/login');
        }
      },
    },
  ];

  // 인자 없이 item.id를 직접 참조
  const handleCardClick = () => {
    router.push(`/alba/${item.id}`);
  };

  return (
    <AlbaCardItem
      dropdownOptions={applyScrapOptions}
      item={item}
      onClick={handleCardClick}
    />
  );
};

export default AlbaCard;
