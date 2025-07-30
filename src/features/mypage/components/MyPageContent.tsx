'use client';

import { useEffect, useState } from 'react';

import { CommentCardItem } from '@/shared/types/mypage';

import useMyPageParams from '../hooks/useMyPageParams';
import {
  useMyCommentsQuery,
  useMyPostsQuery,
  useMyScrapQuery,
} from '../queries';
import MyPageContentSection from './MyPageContentSection';
import MyPageHeader from './MyPageHeader';

const MyPageContent = () => {
  const [tabValue, setTabValue] = useState('post');
  const [publicValue, setPublicValue] = useState('');
  const [recruitValue, setRecruitValue] = useState('');
  const [sortOrderBy, setSortOrderBy] = useState('mostRecent');

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

  const { data: posts, isLoading: isPostLoading } = useMyPostsQuery({
    limit,
    orderBy: postParams.postOrderBy,
    cursor: postParams.postCursor,
    enabled: tabValue === 'post',
  });
  const { data: comments, isLoading: isCommentsLoading } = useMyCommentsQuery({
    page: commentParams.page,
    pageSize: commentParams.pageSize,
    enabled: tabValue === 'comment',
  });
  const { data: scrap, isLoading: isScrapLoading } = useMyScrapQuery({
    limit,
    orderBy: scrapParams.scrapOrderBy,
    cursor: scrapParams.ScrapCursor,
    isPublic: scrapParams.isPublic,
    isRecruiting: scrapParams.isRecruiting,
    enabled: tabValue === 'scrap',
  });

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
    if (isCommentsLoading || !comments) return [];

    const getTime = (item: CommentCardItem) =>
      new Date(item.updatedAt ?? item.createdAt).getTime();

    const sorted = [...comments.data].sort((a, b) => {
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
  console.log(postParams.postOrderBy);

  return (
    <div className="mb-40 w-full max-w-1480">
      <MyPageHeader
        tabValue={tabValue}
        onClickTab={handleClickTab}
        onSelectPublic={handlePublicValue}
        onSelectRecruit={handleRecruitValue}
        onSelectSort={handleBasicOrderBy}
      />
      <MyPageContentSection
        comment={getFilterCommentData()}
        post={posts?.data ?? []}
        scrap={scrap?.data ?? []}
        tabValue={tabValue}
      />
    </div>
  );
};
export default MyPageContent;
