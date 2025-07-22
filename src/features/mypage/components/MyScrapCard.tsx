'use client';

import { useRouter } from 'next/navigation';

import PrivateWrapper from '@/shared/components/common/PrivateWrapper';
import { ScrapCardItem } from '@/shared/types/mypage';

import AlbaCardItem from '../../../shared/components/common/list/AlbaCardItem';
import { DropdownOption } from '../../../shared/components/common/list/AlbaCardItem';

interface MyScrapCardProps {
  cardContent: ScrapCardItem;
  dropdownItem: DropdownOption[];
}

const MyScrapCard = ({ cardContent, dropdownItem }: MyScrapCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/apply/${cardContent.id}`);
  };

  return (
    <PrivateWrapper isPrivate={cardContent.isPublic}>
      <AlbaCardItem
        dropdownOptions={dropdownItem}
        item={cardContent}
        onClick={handleCardClick}
      />
    </PrivateWrapper>
  );
};

export default MyScrapCard;
