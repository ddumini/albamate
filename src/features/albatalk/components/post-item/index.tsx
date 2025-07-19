'use client';

import { useRouter } from 'next/navigation';

import { Post } from '@/features/albatalk/types/albatalk';

import PostCardHeader from './PostCardHeader';
import PostMetaInfo from './PostMetaInfo';

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const router = useRouter();

  const handlePostClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractiveElement =
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('[role="menu"]');

    if (isInteractiveElement) {
      return;
    }

    router.push(`/albatalk/${post.id}`);
  };

  return (
    <div
      className="Border-Card flex h-210 w-full min-w-0 flex-1 cursor-pointer flex-col gap-24 rounded-xl p-24 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      onClick={handlePostClick}
    >
      <div className="min-w-0 flex-1">
        <PostCardHeader postId={post.id} title={post.title} />
        <p className="line-clamp-2 w-220 text-gray-500 dark:text-gray-300">
          {post.content}
        </p>
      </div>
      <PostMetaInfo
        commentCount={post.commentCount}
        createdAt={post.createdAt}
        initialLikeCount={post.likeCount}
        postId={post.id}
        writer={post.writer}
      />
    </div>
  );
};

export default PostItem;
