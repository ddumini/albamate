'use client';

import Tab from '@common/tab/Tab';
import { useState } from 'react';

import { SORT_OPTIONS } from '@/shared/constants/mypageFilterOption';
import {
  ContentType,
  PostCardItem,
  Role,
  SortOption,
} from '@/shared/types/mypage';

import { comment, post, scrap } from '../mock/dummy';
import ScrapFilterControls from './FilterControl';
import MixedSection from './MixedSection';
import MyPageTop from './MyPageTop';

interface TabOption {
  id: string;
  label: string;
}

interface MyPageContentProps {
  role: Role;
  tapOption: TabOption[];
}

const MyPageContent = ({ role, tapOption }: MyPageContentProps) => {
  const [tabValue, setTabValue] = useState('post');
  const [sortValue, setSortValue] = useState('latest');
  const [publicValue, setPublicValue] = useState('all');
  const [recruitValue, setRecruitValue] = useState('all');

  const filterWrapClassName = `${tabValue === 'scrap' ? 'lg:flex-col' : 'lg:flex-row lg:items-center'}`;
  const selectWrapClassName = `${tabValue === 'scrap' ? 'w-full flex items-center justify-between' : ''}`;
  const tabClassName = `${tabValue === 'scrap' ? 'flex items-center lg:justify-start w-full mb-16' : ''}`;

  const sortOption: SortOption[] = SORT_OPTIONS[tabValue as ContentType] || [];

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

  const getFilterPostData = (): PostCardItem[] => {
    if (!post.data || post.data.length === 0) return [];
    let filtered: PostCardItem[] = [...post.data];

    switch (sortValue) {
      case 'latest':
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.updatedAt ?? b.createdAt).getTime() -
            new Date(a.updatedAt ?? a.createdAt).getTime()
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
  const getFilterScrapData = () => {
    let filtered = [...scrap.data];

    if (publicValue !== 'all' && publicValue === 'public') {
      filtered = filtered.filter(item => item.isPublic === false);
    }
    if (publicValue !== 'all' && publicValue === 'private') {
      filtered = filtered.filter(item => item.isPublic === true);
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

  const ScrapFilterControlsProps = {
    publicOption,
    recruitOption,
    setPublicValue,
    setRecruitValue,
    setSortValue,
    sortOption,
    tabValue,
  };

  return (
    <div className="mb-40 w-full max-w-1480">
      <MyPageTop role={role} />
      <section
        className={`xl:mb-24 ${filterWrapClassName} flex flex-col justify-between xl:items-center`}
      >
        <div className={`h-60 ${tabClassName}`}>
          <Tab handleClick={handleClickTab} tabs={tapOption} />
        </div>
        <div className={`self-end ${selectWrapClassName} py-14 lg:py-24`}>
          <ScrapFilterControls {...ScrapFilterControlsProps} />
        </div>
      </section>
      {tabValue === 'post' && (
        <MixedSection cardInfo={getFilterPostData()} type="post" />
      )}
      {tabValue === 'comment' && (
        <MixedSection cardInfo={getFilterCommentData()} type="comment" />
      )}
      {tabValue === 'scrap' && (
        <MixedSection cardInfo={getFilterScrapData()} type="scrap" />
      )}
    </div>
  );
};
export default MyPageContent;
