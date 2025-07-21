import { PostDetailResponse } from '../../types/albatalk';
import PostCardHeader from '../post-item/PostCardHeader';
import PostMetaInfo from '../post-item/PostMetaInfo';

interface AlbatalkDetailHeaderProps {
  data: PostDetailResponse;
}

const AlbatalkDetailHeader = ({ data }: AlbatalkDetailHeaderProps) => {
  const { title, id, createdAt, commentCount, likeCount, writer } = data;
  return (
    <div className="flex flex-col gap-16">
      <PostCardHeader
        className="border-b border-gray-200"
        postId={id}
        title={title}
        titleClassName="pb-16 md:text-xl lg:text-2xl"
      />
      <PostMetaInfo
        className="text-gray-500 lg:text-base"
        commentCount={commentCount}
        createdAt={createdAt}
        initialLikeCount={likeCount}
        postId={id}
        writer={writer}
      />
    </div>
  );
};

export default AlbatalkDetailHeader;
