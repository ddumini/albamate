import {
  CommentCardItem,
  PostCardItem,
  ScrapCardItem,
} from '@/shared/types/mypage';

import MixedSection from './MixedSection';

interface MyPageContentSectionProps {
  tabValue: string;
  post: PostCardItem[];
  comment: CommentCardItem[];
  scrap: ScrapCardItem[];
}

const MyPageContentSection = ({
  tabValue,
  post,
  comment,
  scrap,
}: MyPageContentSectionProps) => {
  if (tabValue === 'post') return <MixedSection cardInfo={post} type="post" />;
  if (tabValue === 'comment')
    return <MixedSection cardInfo={comment} type="comment" />;
  if (tabValue === 'scrap')
    return <MixedSection cardInfo={scrap} type="scrap" />;
};

export default MyPageContentSection;
