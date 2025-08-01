import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthSession } from '@/features/auth';

import { Albatalk } from '../../schemas/albatalk.schema';
import AlbatalkCardHeader from './AlbatalkCardHeader';
import AlbatalkMetaInfo from './AlbatalkMetaInfo';

interface AlbatalkItemProps {
  albatalk: Albatalk;
}

const AlbatalkItem = ({ albatalk }: AlbatalkItemProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthSession();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('로그인이 필요한 페이지입니다.');
      router.push('/signin');
      return;
    }
    router.push(`/albatalk/${albatalk.id}`);
  };
  return (
    <Link
      aria-label={`${albatalk.title} 게시글 보기`}
      className="Border-Card flex h-210 w-full min-w-0 flex-1 cursor-pointer flex-col gap-24 rounded-xl p-24 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      href={`/albatalk/${albatalk.id}`}
      onClick={handleClick}
    >
      <div className="min-w-0 flex-1">
        <AlbatalkCardHeader albatalkId={albatalk.id} title={albatalk.title} />
        <p className="line-clamp-2 w-220 text-gray-500 dark:text-gray-300">
          {albatalk.content}
        </p>
      </div>
      <AlbatalkMetaInfo
        commentCount={albatalk.commentCount}
        createdAt={albatalk.createdAt}
        likeCount={albatalk.likeCount}
        writer={albatalk.writer}
      />
    </Link>
  );
};

export default AlbatalkItem;
