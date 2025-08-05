import { AlbatalkDetailResponse } from '../../schemas/albatalk.schema';
import AlbatalkCardHeader from '../albatalk-item/AlbatalkCardHeader';
import AlbatalkMetaInfo from '../albatalk-item/AlbatalkMetaInfo';

interface AlbatalkDetailHeaderProps {
  data: AlbatalkDetailResponse;
}

const AlbatalkDetailHeader = ({ data }: AlbatalkDetailHeaderProps) => {
  const { title, id, createdAt, commentCount, likeCount, writer, isLiked } =
    data;
  return (
    <div className="flex flex-col gap-16">
      <AlbatalkCardHeader
        albatalkId={id}
        className="border-b border-gray-200"
        title={title}
        titleClassName="pb-16 md:text-xl lg:text-2xl"
        writerId={writer.id}
      />
      <AlbatalkMetaInfo
        isInteractive // 상호작용 가능
        albatalkId={id}
        className="text-gray-500 lg:text-base"
        commentCount={commentCount}
        createdAt={createdAt}
        initialIsLiked={isLiked}
        likeCount={likeCount}
        writer={writer}
      />
    </div>
  );
};

export default AlbatalkDetailHeader;
