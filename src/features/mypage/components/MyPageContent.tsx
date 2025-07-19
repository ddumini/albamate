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

const MyPageContent = ({ role, tapOption }: MyPageContentProps) => {
  const [tabValue, setTabValue] = useState('post');

  const filterWrapClassName = `${tabValue === 'scrap' ? 'lg:flex-col' : 'lg:flex-row lg:items-center'}`;
  const selectWrapClassName = `${tabValue === 'scrap' ? 'w-full flex items-center justify-between' : ''}`;
  const tabClassName = `${tabValue === 'scrap' ? 'flex items-center lg:justify-start w-full mb-16' : ''}`;

  const sortOption = [
    { value: 'latest', label: '최신순' },
    { value: 'comments', label: '댓글많은순' },
    { value: 'like', label: '좋아요순' },
  ];
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

  const handleSort = (value: string) => {
    console.error('임시', value);
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
                    handleSort(value);
                  }}
                />
              </div>
              <div>
                <Select
                  options={recruitOption}
                  placeholder="전체"
                  variant="filter"
                  onSelect={value => {
                    handleSort(value);
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
              handleSort(value);
            }}
          />
        </div>
      </section>
      {tabValue === 'post' && <PostCardSection cardInfo={post.data} />}
      {tabValue === 'comment' && <CommentCardSection cardInfo={comment.data} />}
      {tabValue === 'scrap' && <ScrapCardSection cardInfo={scrap.data} />}
    </div>
  );
};
export default MyPageContent;
