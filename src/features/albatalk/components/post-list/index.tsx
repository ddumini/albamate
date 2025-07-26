'use client';
import FloatingButtonContainer from '@common/button/FloatingButtonContainer';
import { useEffect, useState } from 'react';

import Loading from '@/app/loading';
import mockPostsData from '@/features/albatalk/mocks/getPosts';
import { Post } from '@/features/albatalk/types/albatalk';
import FloatingButton from '@/shared/components/common/button/FloatingButton';

import PostItem from '../post-item/index';
import PostFilterBar from './PostFilterBar';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      try {
        setPosts(mockPostsData.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }, 500); // 0.5초 딜레이
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-1480 pb-128">
      <div className="flex flex-col">
        <PostFilterBar />
        <section className="grid grid-cols-1 gap-24 lg:grid-cols-3">
          {posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </section>
        <FloatingButtonContainer>
          <FloatingButton href="/addtalk" type="addAlbatalk" />
        </FloatingButtonContainer>
      </div>
    </div>
  );
};

export default PostList;
