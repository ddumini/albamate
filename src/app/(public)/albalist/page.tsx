'use client';

import Chip from '@components/common/chip/Chip';
import IconInput from '@components/common/input/IconInput';
import Select from '@components/common/select';
import { differenceInCalendarDays, format, isAfter } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import FloatingButton from '@/shared/components/common/button/FloatingButton';
import FloatingButtonContainer from '@/shared/components/common/button/FloatingButtonContainer';
import { cn } from '@/shared/lib/cn';

import { AlbaItem, albaMockData } from './mock/mockData';

const AlbaListPage = () => {
  const router = useRouter();
  const [albaList, setAlbaList] = useState<AlbaItem[]>([]);

  const RecruitFilterOptions = [
    { value: 'total', label: '전체' },
    { value: 'recruiting', label: '모집 중' },
    { value: 'oldest', label: '모집 마감' },
  ];
  const PublicFilterOptions = [
    { value: 'total', label: '전체' },
    { value: 'public', label: '공개' },
    { value: 'private', label: '비공개' },
  ];
  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'high-wage', label: '시급높은순' },
    { value: 'many-applicants', label: '지원자 많은순' },
    { value: 'many-scraps', label: '스크랩 많은순' },
  ];

  const handleFilterChange = (filterId: string) => {
    console.log('필터 선택:', filterId);
  };

  const handleSortChange = (sortId: string) => {
    console.log('정렬 선택:', sortId);
  };

  const handleCardClick = (id: number) => {
    router.push(`/alba/${id}`);
  };

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      for (const ref of dropdownRefs.current.values()) {
        if (ref && !ref.contains(event.target as Node)) {
          setOpenDropdownId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const fetchAlbaList = async () => {
  //     try {
  //       const res = await fetch('/api/alba'); // 실제 API 주소
  //       const json = await res.json();
  //       setAlbaList(json); // 실제 데이터 구조에 맞게 수정
  //     } catch (error) {
  //       console.error('알바 목록 로딩 실패:', error);
  //     }
  //   };
  //
  //   fetchAlbaList();
  // }, []);

  useEffect(() => {
    // mock 데이터 바로 세팅
    setAlbaList(albaMockData);
  }, []);

  // 예시: user 정보 (실제로는 API 호출 등으로 받아오기)
  const [user, setUser] = useState<{
    role: 'APPLICANT' | 'OWNER';
    // ...기타 프로퍼티
  } | null>(null);

  useEffect(() => {
    // 실제로는 API 호출 등으로 유저 정보 받아오기
    // 여기서는 예시로 OWNER 역할 지정
    setUser({
      role: 'OWNER',
      // ...기타 정보
    });
  }, []);

  const isOwner = user?.role === 'OWNER';

  return (
    <div>
      {/* 검색/필터 영역 */}
      <div className="mb-24 w-full border-b border-gray-100 px-24 md:px-72 dark:border-gray-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-20 lg:gap-20">
          <IconInput
            alt="검색"
            className="w-327 lg:w-728"
            iconClassName="pl-24"
            iconOnClick={() => alert('검색 버튼 클릭')}
            inputClassName="rounded-2xl lg:rounded-3xl lg:pl-68"
            placeholder="어떤 알바를 찾고 계세요?"
            src="/icons/search.svg"
          />
          <div className="flex justify-between">
            <div className="flex gap-16">
              <Select
                options={RecruitFilterOptions}
                placeholder="전체"
                variant="filter"
                onSelect={handleFilterChange}
              />
              {isOwner && (
                <Select
                  options={PublicFilterOptions}
                  placeholder="전체"
                  variant="filter"
                  onSelect={handleFilterChange}
                />
              )}
            </div>

            <Select
              className="mt-8"
              options={sortOptions}
              variant="sort"
              onSelect={handleSortChange}
            />
          </div>
        </div>
      </div>

      {/* 알바 카드 리스트 */}
      <div className="flex flex-wrap justify-center gap-24 px-24">
        {albaList.map((item: AlbaItem) => {
          const start = new Date(item.recruitmentStartDate);
          const end = new Date(item.recruitmentEndDate);
          const isRecruiting = isAfter(end, new Date());
          const dDay = differenceInCalendarDays(end, new Date());
          const imageUrl = item.imageUrls?.[0] || '/images/logo.svg';

          let dDayClass = 'text-gray-600 hover:text-gray-900';
          if (dDay < 0) {
            dDayClass = 'text-gray-400';
          } else if (dDay <= 3) {
            dDayClass = 'text-error brightness-150 font-semibold';
          }

          return (
            <div
              key={item.id}
              className="w-360 cursor-pointer flex-col gap-8 rounded-xl border border-gray-200 p-24 transition-shadow hover:shadow-md lg:w-477"
              onClick={() => handleCardClick(item.id)}
            >
              {/* 이미지 */}
              <div className="relative flex h-180 w-full justify-end overflow-hidden rounded-lg">
                <Image
                  fill
                  alt="알바 이미지"
                  className="object-cover"
                  src={imageUrl}
                />
              </div>

              {/* 칩, 기간, 드롭다운 */}
              <div className="relative mt-12 flex items-center gap-8 text-sm text-gray-600">
                {item.isPublic && <Chip active label="공개" variant="filled" />}
                {isRecruiting ? (
                  <Chip active label="모집 중" variant="filled" />
                ) : (
                  <Chip active label="모집 완료" variant="filled" />
                )}
                <span className="ml-8 whitespace-nowrap text-black">
                  {format(start, 'yyyy.MM.dd')} ~ {format(end, 'yyyy.MM.dd')}
                </span>

                {/* 드롭다운 아이콘 + 드롭다운 메뉴 */}
                <div className="relative ml-auto">
                  <Image
                    alt="드롭다운 아이콘"
                    className="cursor-pointer"
                    height={24}
                    src="/icons/kebab-menu.svg"
                    width={24}
                    onClick={e => {
                      e.stopPropagation();
                      setOpenDropdownId(prev =>
                        prev === item.id ? null : item.id
                      );
                    }}
                  />

                  {openDropdownId === item.id && (
                    <div
                      ref={el => {
                        if (el) dropdownRefs.current.set(item.id, el);
                        else dropdownRefs.current.delete(item.id);
                      }}
                      className="absolute top-full right-0 z-10 mt-4 w-120 rounded-md border border-gray-200 bg-white py-8 shadow-md"
                      onClick={e => e.stopPropagation()}
                    >
                      {[
                        {
                          label: '지원하기',
                          onClick: () => alert(`지원하기 - ${item.title}`),
                        },
                        {
                          label: '스크랩',
                          onClick: () => alert(`스크랩 - ${item.title}`),
                        },
                      ].map(({ label, onClick }) => (
                        <button
                          key={label}
                          className={cn(
                            'relative z-10 inline-block w-full py-8 text-center text-sm transition-all duration-150',
                            'hover:scale-[0.98] hover:rounded-md hover:bg-mint-50 hover:font-medium'
                          )}
                          type="button"
                          onClick={onClick}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 제목 */}
              <h3 className="mt-12 text-lg font-semibold text-black">
                {item.title}
              </h3>

              {/* 지원자/스크랩/마감 D-day */}
              <div className="mt-12 flex w-full justify-center rounded-lg bg-gray-25 py-6 text-xs text-gray-600 dark:bg-gray-100">
                <span className="border-r border-gray-200 px-24 whitespace-nowrap hover:text-gray-900 lg:px-48">
                  지원자{' '}
                  <span className="hover:text-gray-900">
                    {item.applyCount}명
                  </span>
                </span>
                <span className="border-r border-gray-200 px-24 whitespace-nowrap lg:px-48">
                  스크랩{' '}
                  <span className="hover:text-gray-900">
                    {item.scrapCount}명
                  </span>
                </span>
                <span
                  className={cn(
                    `last:border-0 ${dDayClass} px-25 whitespace-nowrap lg:px-48`
                  )}
                >
                  {dDay < 0 ? '마감 완료' : `마감 D-${dDay}`}
                </span>
              </div>
            </div>
          );
        })}

        {isOwner && (
          <FloatingButtonContainer>
            <FloatingButton
              href="/forms/create"
              text="폼 만들기"
              type="addForm"
            />
          </FloatingButtonContainer>
        )}
      </div>
    </div>
  );
};

export default AlbaListPage;
