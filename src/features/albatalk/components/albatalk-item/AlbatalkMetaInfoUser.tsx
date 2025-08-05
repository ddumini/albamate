import Profile from '@/shared/components/common/profile/Profile';
import { cn } from '@/shared/lib/cn';
import { formatDateLong } from '@/shared/utils/format';

import { Writer } from '../../schemas/albatalk.schema';

interface AlbatalkMetaInfoUserProps {
  writer: Writer;
  createdAt: string;
  className?: string;
}

const AlbatalkMetaInfoUser = ({
  writer,
  createdAt,
  className,
}: AlbatalkMetaInfoUserProps) => {
  return (
    <div className={cn('flex items-center gap-7', className)}>
      {/* 프로필 이미지 */}
      <div className="size-26">
        <Profile
          className="size-26 border-none lg:size-26"
          imageUrl={writer.imageUrl ? writer.imageUrl : null}
          sizes="26px"
        />
      </div>
      {/* 닉네임 */}
      <span>{writer.nickname}</span>
      <div className="h-12 w-px bg-line-200" />
      {/* 날짜 */}
      <time>{formatDateLong(createdAt)}</time>
    </div>
  );
};

export default AlbatalkMetaInfoUser;
