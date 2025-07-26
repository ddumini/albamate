'use client';

import Tab from '@common/tab/Tab';
import { useState } from 'react';

import { SORT_OPTIONS } from '@/shared/constants/mypageFilterOption';
import { ContentType, SortOption } from '@/shared/types/mypage';

import { useMyCommentsQuery, useMyPostsQuery } from '../queries';
import MixedSection from './MixedSection';
import MyPageTop from './MyPageTop';

interface TabOption {
  id: string;
  label: string;
}

const MyPageContent = () => {
  const [tabValue, setTabValue] = useState('post');
  const [sortValue, setSortValue] = useState('latest');
  const [isOwner, setIsOwner] = useState(false);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const { data: posts, isLoading: isPostLoading } = useMyPostsQuery(limit);
  const { data: comments, isLoading: isCommentsLoading } = useMyCommentsQuery(
    page,
    pageSize
  );

  const filterWrapClassName =
    tabValue === 'scrap' ? 'lg:flex-col' : 'lg:flex-row lg:items-center';
  const selectWrapClassName =
    tabValue === 'scrap' ? 'w-full flex items-center justify-between' : '';
  const tabClassName =
    tabValue === 'scrap'
      ? 'flex items-center lg:justify-start w-full mb-16'
      : '';

  const sortOption: SortOption[] = SORT_OPTIONS[tabValue as ContentType] || [];

  const tapOption = [
    { id: 'post', label: '내가 쓴 글' },
    { id: 'comment', label: '내가 쓴 댓글' },
    !isOwner && { id: 'scrap', label: '스크랩' },
  ].filter((item): item is TabOption => Boolean(item));

  const publicOption = [
    { value: 'all', label: '전체' },
    { value: 'public', label: '공개' },
    { value: 'private', label: '비공개' },
  ];
  const recruitOption = [
    { value: 'all', label: '전체' },
    { value: 'recruit', label: '모집중' },
    { value: 'close', label: '모집 마감' },
  ];

  const handleClickTab = (value: string) => {
    setTabValue(value);
  };

  const getFilterCommentData = () => {
    if (isCommentsLoading || !comments) return [];
    let filtered = [...comments];

    switch (sortValue) {
      case 'latest':
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.updatedAt ? b.updatedAt : b.createdAt).getTime() -
            new Date(a.updatedAt ? a.updatedAt : a.createdAt).getTime()
        );
        break;

      case 'old':
        filtered = filtered.sort(
          (a, b) =>
            new Date(a.updatedAt ? a.updatedAt : a.createdAt).getTime() -
            new Date(b.updatedAt ? b.updatedAt : b.createdAt).getTime()
        );
        break;
    }

    return filtered;
  };

  const ScrapFilterControlsProps = {
    publicOption,
    recruitOption,
    setSortValue,
    sortOption,
    tabValue,
  };

  if (isPostLoading || !posts) return;
  return (
    <div className="mb-40 w-full max-w-1480">
      <MyPageTop isOwner={isOwner} />
      <section
        className={`xl:mb-24 ${filterWrapClassName} flex flex-col justify-between xl:items-center`}
      >
        <div className={`h-60 ${tabClassName}`}>
          <Tab handleClick={handleClickTab} tabs={tapOption} />
        </div>
        <div className={`self-end ${selectWrapClassName} py-14 lg:py-24`}>
          {/* <ScrapFilterControls {...ScrapFilterControlsProps} /> */}
        </div>
      </section>
      {tabValue === 'post' && <MixedSection cardInfo={posts} type="post" />}
      {tabValue === 'comment' && (
        <MixedSection cardInfo={getFilterCommentData()} type="comment" />
      )}
      {/* {tabValue === 'scrap' && (
        <MixedSection cardInfo={getFilterScrapData()} type="scrap" />
      )} */}
    </div>
  );
};
export default MyPageContent;
