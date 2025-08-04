import Tab from '@/shared/components/common/tab/Tab';
import { SORT_OPTIONS } from '@/shared/constants/mypageFilterOption';
import { ContentType, SortOption } from '@/shared/types/mypage';

import { useSessionUtils } from '../../../shared/lib/auth/use-session-utils';
import { useSessionStore } from '../store/SessionState';
import ScrapFilterControls from './FilterControl';
import MyPageTop from './MyPageTop';

interface MyPageHeaderProps {
  tabValue: string;
  onClickTab: (value: string) => void;
  onSelectPublic: (value: string) => void;
  onSelectRecruit: (value: string) => void;
  onSelectSort: (value: string) => void;
}

interface TabOption {
  id: string;
  label: string;
}

const MyPageHeader = ({
  tabValue,
  onClickTab,
  onSelectPublic,
  onSelectRecruit,
  onSelectSort,
}: MyPageHeaderProps) => {
  const { isOwner } = useSessionUtils();
  const user = useSessionStore(state => state.user);

  const tabOption = [
    { id: 'post', label: '내가 쓴 글' },
    { id: 'comment', label: '내가 쓴 댓글' },
    user?.role !== 'OWNER' ? { id: 'scrap', label: '스크랩' } : null,
  ].filter((item): item is TabOption => Boolean(item));

  const sortOption: SortOption[] = SORT_OPTIONS[tabValue as ContentType] || [];

  const publicOption = [
    { value: '', label: '전체' },
    { value: 'true', label: '공개' },
    { value: 'false', label: '비공개' },
  ];
  const recruitOption = [
    { value: '', label: '전체' },
    { value: 'true', label: '모집중' },
    { value: 'false', label: '모집 마감' },
  ];

  const filterWrapClassName =
    tabValue === 'scrap' ? 'lg:flex-col' : 'lg:flex-row lg:items-center';
  const selectWrapClassName =
    tabValue === 'scrap' ? 'w-full flex items-center justify-between' : '';
  const tabClassName =
    tabValue === 'scrap'
      ? 'flex items-center lg:justify-start w-full mb-16'
      : '';

  const ScrapFilterControlsProps = {
    tabValue,
    publicOption,
    recruitOption,
    sortOption,
    onSelectPublic,
    onSelectRecruit,
    onSelectSort,
  };
  return (
    <>
      <MyPageTop isOwner={user?.role ?? null} />
      <section
        className={`xl:mb-24 ${filterWrapClassName} flex flex-col justify-between xl:items-center`}
      >
        <div className={`h-60 ${tabClassName}`}>
          <Tab handleClick={onClickTab} tabs={tabOption} />
        </div>
        <div className={`self-end ${selectWrapClassName} py-14 lg:py-24`}>
          <ScrapFilterControls {...ScrapFilterControlsProps} />
        </div>
      </section>
    </>
  );
};

export default MyPageHeader;
