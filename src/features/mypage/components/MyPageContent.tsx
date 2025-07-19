'use client';

import { useState } from 'react';

import Select from '@/shared/components/common/select';
import Tab from '@/shared/components/common/tab/Tab';

import CommentCardSection from './CommentCardSection';
import { comment, post, scrap } from './dummy';
import MyPageTop from './MyPageTop';
import PostCardSection from './PostCardSection';
import ScrapCardSection from './ScrapCardSection';

interface TabOption {
  id: string;
  label: string;
}

interface MyPageContentProps {
  role: string;
  tapOption: TabOption[];
}

interface SortOption {
  value: string;
  label: string;
}

const MyPageContent = ({ role, tapOption }: MyPageContentProps) => {
  const [tabValue, setTabValue] = useState('post');
  const [sortValue, setSortValue] = useState('latest');
  const [publicValue, setPublicValue] = useState('all');
  const [recruitValue, setRecruitValue] = useState('all');

  const filterWrapClassName = `${tabValue === 'scrap' ? 'lg:flex-col' : 'lg:flex-row lg:items-center'}`;
  const selectWrapClassName = `${tabValue === 'scrap' ? 'w-full flex items-center justify-between' : ''}`;
  const tabClassName = `${tabValue === 'scrap' ? 'flex items-center lg:justify-start w-full mb-16' : ''}`;

  let sortOption: SortOption[] = [];

  switch (tabValue) {
    case 'post':
      sortOption = [
        { value: 'latest', label: '최신순' },
        { value: 'comments', label: '댓글 많은 순' },
        { value: 'like', label: '좋아요 순' },
      ];
      break;
    case 'comment':
      sortOption = [{ value: 'latest', label: '최신순' }];
      break;
    case 'scrap':
      sortOption = [
        { value: 'latest', label: '최신순' },
        { value: 'scrap', label: '스크랩 많은 순' },
        { value: 'apply', label: '지원 많은 순' },
      ];
      break;
    default:
      sortOption = [];
  }

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

  const getFilterPostData = () => {
    let filtered = [...post.data];

    switch (sortValue) {
      case 'latest':
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.updatedAt ? b.updatedAt : b.createdAt).getTime() -
            new Date(a.updatedAt ? a.updatedAt : a.createdAt).getTime()
        );
        break;

      case 'comments':
        filtered = filtered.sort((a, b) => b.commentCount - a.commentCount);
        break;

      case 'like':
        filtered = filtered.sort((a, b) => b.likeCount - a.likeCount);
        break;
    }

    return filtered;
  };
  const getFilterCommentData = () => {
    let filtered = [...comment.data];

    switch (sortValue) {
      case 'latest':
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.updatedAt ? b.updatedAt : b.createdAt).getTime() -
            new Date(a.updatedAt ? a.updatedAt : a.createdAt).getTime()
        );
        break;
    }

    return filtered;
  };
  const getFilterScrapData = () => {
    let filtered = [...scrap.data];

    if (publicValue !== 'all' && publicValue === 'public') {
      filtered = filtered.filter(item => item.isPublic === true);
    }
    if (publicValue !== 'all' && publicValue === 'private') {
      filtered = filtered.filter(item => item.isPublic === false);
    }

    if (recruitValue !== 'all' && recruitValue === 'recruit') {
      filtered = filtered.filter(
        item => new Date(item.recruitmentEndDate) >= new Date()
      );
    }

    if (recruitValue !== 'all' && recruitValue === 'close') {
      filtered = filtered.filter(
        item => new Date(item.recruitmentEndDate) < new Date()
      );
    }

    switch (sortValue) {
      case 'latest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'scrap':
        filtered.sort((a, b) => b.scrapCount - a.scrapCount);
        break;
      case 'apply':
        filtered.sort((a, b) => b.applyCount - a.applyCount);
        break;
    }

    return filtered;
  };

  return (
    <div className="max-w-1480 pt-85">
      <MyPageTop role={role} />
      <section
        className={`xl:mb-24 ${filterWrapClassName} flex flex-col justify-between xl:items-center`}
      >
        <div className={`h-60 ${tabClassName}`}>
          <Tab handleClick={handleClickTab} tabs={tapOption} />
        </div>
        <div className={`self-end ${selectWrapClassName} py-14 lg:py-24`}>
          {tabValue === 'scrap' && (
            <div className="flex items-center gap-10 lg:gap-16">
              <div>
                <Select
                  options={publicOption}
                  placeholder="전체"
                  variant="filter"
                  onSelect={value => {
                    setPublicValue(value);
                  }}
                />
              </div>
              <div>
                <Select
                  options={recruitOption}
                  placeholder="전체"
                  variant="filter"
                  onSelect={value => {
                    setRecruitValue(value);
                  }}
                />
              </div>
            </div>
          )}
          <Select
            options={sortOption}
            placeholder="최신순"
            variant="sort"
            onSelect={value => {
              setSortValue(value);
            }}
          />
        </div>
      </section>
      {tabValue === 'post' && (
        <PostCardSection cardInfo={getFilterPostData()} />
      )}
      {tabValue === 'comment' && (
        <CommentCardSection cardInfo={getFilterCommentData()} />
      )}
      {tabValue === 'scrap' && (
        <ScrapCardSection cardInfo={getFilterScrapData()} />
      )}
    </div>
  );
};
export default MyPageContent;
