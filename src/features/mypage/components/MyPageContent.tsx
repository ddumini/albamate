'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { CommentCardItem } from '@/shared/types/mypage';
import { CommentsApi, PostApi, ScrapApi } from '@/shared/types/mypage';

import useMyPageApi from '../api/api';
import useMyPageParams from '../hooks/useMyPageParams';
import MyPageContentSection from './MyPageContentSection';
import MyPageHeader from './MyPageHeader';

const MyPageContent = () => {
  const [tabValue, setTabValue] = useState('post');
  const [publicValue, setPublicValue] = useState('');
  const [recruitValue, setRecruitValue] = useState('');
  const [sortOrderBy, setSortOrderBy] = useState('mostRecent');

  const { isLoading: isAuthLoading } = useSessionUtils();

  const {
    limit,
    postParams,
    commentParams,
    scrapParams,
    setIsPublic,
    setPostOrderBy,
    setIsRecruiting,
    setScrapOrderBy,
  } = useMyPageParams();

  const api = useMyPageApi();

  // 커서 기반 무한 스크롤 (Post, Scrap)
  const {
    data: postsData,
    isLoading: isPostLoading,
    isFetchingNextPage: isFetchingNextPosts,
    loadMoreRef: postsLoadMoreRef,
    getData: getPostsData,
  } = useInfiniteScroll({
    mode: 'cursor',
    queryKey: ['myPosts', limit, postParams.postOrderBy],
    fetcher: async (params: PostApi) => {
      return await api.getMyPosts(params);
    },
    initialParams: { limit, orderBy: postParams.postOrderBy },
    enabled: tabValue === 'post',
  });

  const {
    data: scrapData,
    isLoading: isScrapLoading,
    isFetchingNextPage: isFetchingNextScrap,
    loadMoreRef: scrapLoadMoreRef,
    getData: getScrapData,
  } = useInfiniteScroll({
    mode: 'cursor',
    queryKey: [
      'myScrap',
      limit,
      scrapParams.scrapOrderBy,
      String(scrapParams.isPublic ?? ''),
      String(scrapParams.isRecruiting ?? ''),
    ],
    fetcher: async (params: ScrapApi) => {
      return await api.getMyScrapAlba(params);
    },
    initialParams: {
      limit,
      orderBy: scrapParams.scrapOrderBy,
      isPublic: scrapParams.isPublic,
      isRecruiting: scrapParams.isRecruiting,
    },
    enabled: tabValue === 'scrap',
  });

  // 페이지 기반 무한 스크롤 (Comments)
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isFetchingNextPage: isFetchingNextComments,
    loadMoreRef: commentsLoadMoreRef,
    getData: getCommentsData,
  } = useInfiniteScroll({
    mode: 'page',
    queryKey: ['myComments', commentParams.pageSize],
    fetcher: async (params: CommentsApi) => {
      return await api.getMyComments(params.page, params.pageSize);
    },
    initialParams: { pageSize: commentParams.pageSize },
    enabled: tabValue === 'comment',
  });

  // 현재 활성화된 loadMoreRef 선택
  const getActiveLoadMoreRef = () => {
    if (tabValue === 'post') return postsLoadMoreRef;
    if (tabValue === 'comment') return commentsLoadMoreRef;
    if (tabValue === 'scrap') return scrapLoadMoreRef;
    return null;
  };

  const handleClickTab = (value: string) => setTabValue(value);
  const handlePublicValue = (value: string) => setPublicValue(value);
  const handleRecruitValue = (value: string) => setRecruitValue(value);
  const handleBasicOrderBy = (value: string) => setSortOrderBy(value);

  const getBoolValue = (str: string) => {
    switch (str) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return null;
    }
  };

  useEffect(() => {
    setIsPublic(getBoolValue(publicValue));
  }, [publicValue, setIsPublic]);

  useEffect(() => {
    setIsRecruiting(getBoolValue(recruitValue));
  }, [recruitValue, setIsRecruiting]);

  useEffect(() => {
    setSortOrderBy('mostRecent');
  }, [tabValue]);

  const getFilterCommentData = () => {
    if (isCommentsLoading || !commentsData) return [];

    const commentData = getCommentsData();
    const getTime = (item: CommentCardItem) =>
      new Date(item.updatedAt ?? item.createdAt).getTime();

    const sorted = [...commentData].sort((a, b) => {
      if (sortOrderBy === 'mostRecent') return getTime(b) - getTime(a);
      if (sortOrderBy === 'mostOld') return getTime(a) - getTime(b);
      return 0;
    });

    return sorted;
  };

  useEffect(() => {
    if (tabValue === 'post') setPostOrderBy(sortOrderBy);
    if (tabValue === 'scrap') setScrapOrderBy(sortOrderBy);
  }, [sortOrderBy, tabValue, setPostOrderBy, setScrapOrderBy]);

  // if (isAuthLoading) return <LoadingSpinner size="lg" />;

  return (
    <div className="mb-40 w-full max-w-1480">
      <MyPageHeader
        tabValue={tabValue}
        onClickTab={handleClickTab}
        onSelectPublic={handlePublicValue}
        onSelectRecruit={handleRecruitValue}
        onSelectSort={handleBasicOrderBy}
      />
      {isPostLoading || isScrapLoading || isCommentsLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <MyPageContentSection
          comment={getFilterCommentData()}
          post={getPostsData()}
          scrap={getScrapData()}
          tabValue={tabValue}
        />
      )}

      {/* 무한 스크롤 감지용 요소 */}
      <div ref={getActiveLoadMoreRef()} className="h-4 w-full" />

      {/* 로딩 상태 표시 */}
      {(isFetchingNextPosts ||
        isFetchingNextComments ||
        isFetchingNextScrap) && (
        <div className="flex justify-center py-4">
          <div className="text-gray-500">더 많은 데이터를 불러오는 중...</div>
        </div>
      )}
    </div>
  );
};

export default MyPageContent;
