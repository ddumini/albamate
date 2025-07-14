import Image from 'next/image';

import useViewport from '@/shared/hooks/useViewport';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

interface PageEllipsis {
  type: string;
  position: string;
}

const PAGINATOR_LIMITS = {
  // 769px 이하는 3개, 그 이상은 5개 페이지 버튼 표시
  MOBILE: 3,
  DESKTOP: 5,
};

const Paginator = ({ currentPage, totalPages, onChange }: PaginatorProps) => {
  const { isTablet, isMobile } = useViewport(); // 현재 화면 너비를 가져오는 훅 사용
  const visiblePages =
    isTablet || isMobile ? PAGINATOR_LIMITS.MOBILE : PAGINATOR_LIMITS.DESKTOP;
  const renderPageNumbers = () => {
    // 페이지 번호 렌더링 함수
    const pages: (PageEllipsis | number)[] = [];

    const createRange = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const getPageType = () => {
      const showLeft = currentPage <= visiblePages - 1;
      const showRight = currentPage >= totalPages - (visiblePages - 2);
      if (totalPages <= visiblePages) {
        // 전체 페이지 수가 적으면 모두 표시
        return 'all';
      } else if (showLeft) {
        // 앞쪽 페이지 구간(현재 페이지가 왼쪽에 가까운 경우)
        return 'left';
      } else if (showRight) {
        // 뒤쪽 페이지 구간(현재 페이지가 오른쪽에 가까운 경우)
        return 'right';
      } else {
        // 중간 페이지 구간(현재 페이지가 중간에 가까운 경우)
        return 'middle';
      }
    };

    switch (getPageType()) {
      case 'all':
        pages.push(...createRange(1, totalPages));
        break;
      case 'left':
        pages.push(...createRange(1, visiblePages));
        pages.push({ type: 'ellipsis', position: 'end' }, totalPages);
        break;
      case 'right':
        pages.push(1, { type: 'ellipsis', position: 'start' });
        pages.push(...createRange(totalPages - visiblePages + 1, totalPages));
        break;
      case 'middle': {
        const sidePages = Math.floor((visiblePages - 2) / 2); // 양쪽에 표시할 페이지 수
        pages.push(1, { type: 'ellipsis', position: 'middle-start' });
        pages.push(
          ...createRange(currentPage - sidePages, currentPage + sidePages)
        );
        pages.push({ type: 'ellipsis', position: 'middle-end' }, totalPages);
        break;
      }
      default:
        break;
    }

    return pages.map(page => {
      if (typeof page === 'object' && page.type === 'ellipsis') {
        return (
          <div
            key={`ellipsis-${page.position}`} // ellipsis의 위치로 고유한 key 생성
            className="pb-1/3 flex h-34 w-34 items-center justify-center rounded-md bg-background-200 text-md font-medium text-gray-200 lg:h-48 lg:w-48 lg:rounded-lg lg:text-2lg"
          >
            <span className="h-fit pb-9 leading-none">...</span>
          </div>
        );
      }

      const pageNumber = page as number;
      const pageClassName =
        currentPage === pageNumber
          ? 'text-black-400 font-semibold'
          : 'text-gray-200 font-medium';

      return (
        <button
          key={`page-${page}`}
          className={`flex h-34 w-34 cursor-pointer items-center justify-center rounded-md bg-background-200 text-center text-md lg:h-48 lg:w-48 lg:rounded-lg lg:text-2lg ${pageClassName}`}
          disabled={currentPage === pageNumber}
          type="button"
          onClick={() => onChange(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="h-34 w-34 cursor-pointer rounded-md bg-background-200 p-9 disabled:cursor-default lg:h-48 lg:w-48 lg:rounded-lg lg:p-12"
        disabled={currentPage === 1}
        type="button"
        onClick={() => onChange(currentPage - 1)}
      >
        <div className="relative h-full w-full">
          <Image
            fill
            alt="previous page"
            sizes="(min-width: 1024px) 24px, 16px"
            src={
              currentPage === 1
                ? '/icons/chevron-left.svg'
                : '/icons/chevron-left-black.svg'
            }
          />
        </div>
      </button>
      {renderPageNumbers()}
      <button
        className="h-34 w-34 cursor-pointer rounded-md bg-background-200 p-9 disabled:cursor-default lg:h-48 lg:w-48 lg:rounded-lg lg:p-12"
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => onChange(currentPage + 1)}
      >
        <div className="relative h-full w-full">
          <Image
            fill
            alt="next page"
            sizes="(min-width: 1024px) 24px, 16px"
            src={
              currentPage === totalPages
                ? '/icons/chevron-right.svg'
                : '/icons/chevron-right-black.svg'
            }
          />
        </div>
      </button>
    </div>
  );
};

export default Paginator;
