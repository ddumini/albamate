import { CommentsResponse, PostDetailResponse } from '../../types/albatalk';
import AlbatalkDetailContent from './AlbatalkDetailContent';
import AlbatalkDetailHeader from './AlbatalkDetailHeader';
import CommentSection from './CommentSection';

interface AlbatalkDetailProps {
  data: PostDetailResponse;
  comments: CommentsResponse;
}

const AlbatalkDetail = ({ data, comments }: AlbatalkDetailProps) => {
  return (
    <div className="flex flex-col gap-40 pt-44">
      <AlbatalkDetailHeader data={data} />
      <AlbatalkDetailContent content={data.content} />
      <CommentSection initialComments={comments} postId={data.id} />
    </div>
  );
};

export default AlbatalkDetail;
