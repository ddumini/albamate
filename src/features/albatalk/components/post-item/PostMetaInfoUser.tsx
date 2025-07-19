import Profile from '@/shared/components/common/profile/Profile';
import { formatDate } from '@/shared/utils/date';

import { Writer } from '../../types/albatalk';

interface PostMetaInfoUserProps {
  writer: Writer;
  createdAt: string;
}

const PostMetaInfoUser = ({ writer, createdAt }: PostMetaInfoUserProps) => {
  return (
    <div className="flex items-center gap-7">
      {/* 프로필 이미지 */}
      <div className="size-26">
        {writer.imageUrl ? (
          <Profile
            className="size-26 border-none lg:size-26"
            imageUrl={writer.imageUrl}
          />
        ) : (
          <Profile className="size-26 border-none lg:size-26" sizes="26px" />
        )}
      </div>
      {/* 닉네임 */}
      <span>{writer.nickname}</span>
      <div className="h-12 w-px bg-line-200" />
      {/* 날짜 */}
      <time>{formatDate(createdAt, 'post')}</time>
    </div>
  );
};

export default PostMetaInfoUser;
