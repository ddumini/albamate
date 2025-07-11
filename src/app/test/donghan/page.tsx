"use client";

import { useState } from "react";

import CardPagination from "@/shared/components/common/pagination/CardPagination";
import Indicator from "@/shared/components/common/pagination/Indicator";
import Paginator from "@/shared/components/common/pagination/Paginator";

const TestPage = () => {
  const [page, setPage] = useState(1);
  const nextCursor = 120; // 예시로 120일 사용 API연결 시 API 커서 값 사용
  const itemsPerPage = 6; // 페이지당 보여줄 아이템의 수
  const totalPages = Math.ceil(nextCursor / itemsPerPage); // 전체 페이지 수 계산
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <h1>Test Page</h1>
      <Paginator
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />

      {/* CardPagination, Indicator - 임시로 커서값 사용, 실 사용에선 이미지 총 개수로 대체 */}
      <CardPagination currentPage={page} totalPage={totalPages} />
      <Indicator current={page - 1} total={totalPages} />
    </div>
  );
};

export default TestPage;
