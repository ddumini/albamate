import Image from "next/image";

import useWindowWidth from "@/shared/hooks/useWindowWidth";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Paginator = ({ currentPage, totalPages, onChange }: PaginatorProps) => {
  const width = useWindowWidth();
  const isSmallScreen = typeof width === "number" && width < 769;
  const visiblePages = isSmallScreen ? 3 : 5;

  const renderPageNumbers = () => {
    const pages: (string | number)[] = [];

    const createRange = (start: number, end: number) => {
      const range: number[] = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    };

    if (totalPages <= visiblePages) {
      // 전체 페이지 수가 적으면 모두 표시
      pages.push(...createRange(1, totalPages));
    } else {
      const showLeft = currentPage <= visiblePages - 1;
      const showRight = currentPage >= totalPages - (visiblePages - 2);
      if (showLeft) {
        // 앞쪽 페이지 구간
        pages.push(...createRange(1, visiblePages));
        pages.push("...", totalPages);
      } else if (showRight) {
        // 뒤쪽 페이지 구간
        pages.push(1, "...");
        pages.push(...createRange(totalPages - visiblePages + 1, totalPages));
      } else {
        // 중간 페이지 구간
        const sidePages = Math.floor((visiblePages - 2) / 2); // 양쪽에 표시할 페이지 수
        pages.push(1, "...");
        pages.push(
          ...createRange(currentPage - sidePages, currentPage + sidePages),
        );
        pages.push("...", totalPages);
      }
    }

    return pages.map((page, index) => {
      const pageClassName =
        currentPage === page
          ? "text-black-400 font-semibold"
          : "text-gray-200 font-medium";
      return page === "..." ? (
        <div
          key={`ellipsis-${index}`}
          className="flex justify-center items-center w-34 h-34 pc:w-48 pc:h-48 text-md pc:text-2lg bg-background-200 rounded-md pc:rounded-lg text-gray-200 pb-1/3 font-medium"
        >
          <span className="h-fit leading-none pb-9">...</span>
        </div>
      ) : (
        <button
          key={`page-${page}`}
          className={`flex justify-center items-center w-34 h-34 pc:w-48 pc:h-48 cursor-pointer text-center text-md pc:text-2lg bg-background-200 rounded-md pc:rounded-lg ${pageClassName}`}
          disabled={currentPage === page}
          onClick={() => onChange(Number(page))}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="w-34 h-34 pc:w-48 pc:h-48 bg-background-200 p-9 pc:p-12 rounded-md pc:rounded-lg"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        <div className="relative w-full h-full">
          <Image
            fill
            alt="previous page"
            src={
              currentPage === 1
                ? "/icons/chevron-left.svg"
                : "/icons/chevron-left-black.svg"
            }
          />
        </div>
      </button>
      {renderPageNumbers()}
      <button
        className="w-34 h-34 pc:w-48 pc:h-48 bg-background-200 p-9 pc:p-12 rounded-md pc:rounded-lg"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        <div className="relative w-full h-full">
          <Image
            fill
            alt="next page"
            src={
              currentPage === totalPages
                ? "/icons/chevron-right.svg"
                : "/icons/chevron-right-black.svg"
            }
          />
        </div>
      </button>
    </div>
  );
};

export default Paginator;
