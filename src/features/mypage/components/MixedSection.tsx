'use client';

import EmptyCard from '@common/EmptyCard';
import { useRouter } from 'next/navigation';

import useModalStore from '@/shared/store/useModalStore';
import {
  CommentCardItem,
  ContentType,
  EmptyType,
  PostCardItem,
  ScrapCardItem,
} from '@/shared/types/mypage';

import {
  useMyCommentDelete,
  useMyPostDelete,
  useMyScrapDelete,
} from '../queries';
import renderModalContent from '../utils/renderModalContent';
import CardSection from './CardSection';
import CommentEdit from './CommentEdit';
import MyCommentCard from './MyCommentCard';
import MyPostCard from './MyPostCard';
import MyScrapCard from './MyScrapCard';

type CardInfoItem = PostCardItem | CommentCardItem | ScrapCardItem;

type UsedEmptyType = Extract<EmptyType, 'post' | 'comment' | 'scrap'>;

interface EmptyInfo {
  title: string;
  description?: string;
}

interface MixedSectionProps {
  cardInfo: CardInfoItem[];
  type: ContentType;
}

const MixedSection = ({ cardInfo, type }: MixedSectionProps) => {
  const router = useRouter();

  const firstItem = cardInfo && cardInfo[0];
  const scrapWrapStyle =
    'grid-rows-auto relative grid grid-cols-1 gap-y-32 md:gap-y-48 lg:gap-x-25 lg:gap-y-45 lg:grid-cols-2 xl:grid-cols-3';
  const postCommentWrapStyle =
    'grid-rows-auto grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3';

  const deletePost = useMyPostDelete();
  const deleteComments = useMyCommentDelete();
  const deleteScrap = useMyScrapDelete();

  const { openModal, closeModal } = useModalStore();

  // Card 컴포넌트 Wrap 스타일 결정 함수
  const getCardWrapStyle = (item: CardInfoItem) => {
    if (!item) return;
    if ('isPublic' in item) return scrapWrapStyle;
    if ('writer' in item || 'post' in item) return postCommentWrapStyle;
  };

  // 카드의 드롭다운 아이템 결정 함수
  const getDropdownItems = (
    type: ContentType,
    id: number,
    commentId?: number,
    comment?: string
  ) => {
    switch (type) {
      case 'post':
        return [
          {
            label: '수정하기',
            onClick: () => router.push(`/addtalk?albatalkId=${id}`),
          },
          {
            label: '삭제하기',
            onClick: () => deletePost.mutate(id),
          },
        ];
      case 'comment':
        return [
          {
            label: '수정하기',
            onClick: () => {
              if (!comment || !commentId) return;
              openModal(
                renderModalContent(
                  '댓글 수정하기',
                  <CommentEdit
                    close={closeModal}
                    content={comment}
                    id={commentId}
                  />
                )
              );
            },
          },
          {
            label: '삭제하기',
            onClick: () => {
              if (!commentId) return;
              deleteComments.mutate(commentId);
            },
          },
        ];
      case 'scrap':
        return [
          { label: '지원하기', onClick: () => router.push(`/apply/${id}`) },
          { label: '스크랩 취소', onClick: () => deleteScrap.mutate(id) },
        ];
    }
  };

  // 카드 렌더링 함수
  const renderCard = (item: CardInfoItem) => {
    if ('isPublic' in item) {
      return (
        <MyScrapCard
          cardContent={item}
          dropdownItem={getDropdownItems('scrap', item.id)}
        />
      );
    }
    if ('writer' in item) {
      return (
        <MyPostCard
          cardContent={item}
          dropdownItem={getDropdownItems('post', item.id)}
        />
      );
    }

    return (
      <MyCommentCard
        cardContent={item}
        dropdownItem={getDropdownItems(
          'comment',
          item.post.id,
          item.id,
          item.content
        )}
      />
    );
  };

  const cardWrapStyle = firstItem && getCardWrapStyle(firstItem);

  const EMPTY_DATA: Record<UsedEmptyType, EmptyInfo> = {
    post: {
      title: '작성한 게시글이 없어요.',
      description: '궁금한 점, 고민 등의 게시글을 올려보세요',
    },
    comment: {
      title: '작성한 댓글이 없어요.',
    },
    scrap: {
      title: '스크랩한 알바폼이 없어요.',
    },
  };

  if (!cardInfo || cardInfo?.length === 0) {
    return (
      <EmptyCard
        description={EMPTY_DATA[type]?.description ?? ''}
        title={EMPTY_DATA[type].title}
        type={type}
      />
    );
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
