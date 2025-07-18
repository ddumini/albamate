import CommentCardSection from './CommentCardSection';
import { comment, post, scrap } from './dummy';
import MyPageFilters from './MyPageFilters';
import MyPageTop from './MyPageTop';
import PostCardSection from './PostCardSection';
import ScrapCardSection from './ScrapCardSection';

const MyPageContent = () => {
  return (
    <div className="max-w-1480 px-24 pt-85 md:px-72 lg:mx-auto">
      <MyPageTop />
      <MyPageFilters />
      <PostCardSection cardInfo={post.data} />
      <CommentCardSection cardInfo={comment} />
      <ScrapCardSection cardInfo={scrap} />
    </div>
  );
};
export default MyPageContent;
