'use client';

import {
  CommentCardItem,
  PostCardItem,
  ScrapCardItem,
} from '@/shared/types/mypage';

import CardSection from './CardSection';
import EmptyCard from './EmptyCard';
import MyCommentCard from './MyCommentCard';
import MyPostCard from './MyPostCard';
import MyScrapCard from './MyScrapCard';

type CardInfoItem = PostCardItem | CommentCardItem | ScrapCardItem;
type ContentType = 'post' | 'comment' | 'scrap';

interface MixedSectionProps {
  cardInfo: CardInfoItem[];
  type: ContentType;
}

const MixedSection = ({ cardInfo, type }: MixedSectionProps) => {
  const firstItem = cardInfo[0];
  const scrapWrapStyle =
    'grid-rows-auto relative grid grid-cols-1 place-items-center items-center gap-y-32 md:gap-y-48 lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3';
  const postCommentWrapStyle =
    'grid-rows-auto grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3';

  // Card 컴포넌트 Wrap 스타일 결정 함수
  const getCardWrapStyle = (item: CardInfoItem) => {
    if (!item) return;
    if ('isPublic' in item) return scrapWrapStyle;
    if ('writer' in item || 'post' in item) return postCommentWrapStyle;
  };

  // 카드의 드롭다운 아이템 결정 함수
  const getDropdownItems = (type: ContentType) => {
    switch (type) {
      case 'post':
      case 'comment':
        return [
          { value: '수정하기', clickEvent: () => console.log('') },
          { value: '삭제하기', clickEvent: () => console.log('') },
        ];
      case 'scrap':
        return [
          { value: '지원하기', clickEvent: () => console.error('') },
          { value: '스크랩 취소', clickEvent: () => console.error('') },
        ];
    }
  };

  // 카드 렌더링 함수
  const renderCard = (item: CardInfoItem) => {
    if ('isPublic' in item) {
      return (
        <MyScrapCard
          cardContent={item}
          dropdownItem={getDropdownItems('scrap')}
        />
      );
    }
    if ('writer' in item) {
      return (
        <MyPostCard
          cardContent={item}
          dropdownItem={getDropdownItems('post')}
        />
      );
    }

    return (
      <MyCommentCard
        cardContent={item}
        dropdownItem={getDropdownItems('comment')}
      />
    );
  };

  const cardWrapStyle = firstItem && getCardWrapStyle(firstItem);

  if (cardInfo.length === 0) {
    return <EmptyCard type={type} />;
  }

  return (
    <CardSection
      cardInfo={cardInfo}
      cardWrapStyle={cardWrapStyle}
      renderCard={renderCard}
    />
  );
};
export default MixedSection;
