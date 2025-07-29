import { useState } from 'react';

const useMyPageParams = () => {
  // Post, Scrap
  const [limit, setLimit] = useState(6);
  const [postOrderBy, setPostOrderBy] = useState('mostRecent');
  const [scrapOrderBy, setScrapOrderBy] = useState('mostRecent');
  const [postCursor, setPostCursor] = useState<number | null>(null);
  const [ScrapCursor, setScrapCursor] = useState<number | null>(null);
  // Comments
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Scrap
  const [isPublic, setIsPublic] = useState<boolean | null>(null);
  const [isRecruiting, setIsRecruiting] = useState<boolean | null>(null);

  return {
    // 공통
    limit,
    setLimit,

    // post params 관련
    postParams: {
      postOrderBy,
      postCursor,
    },

    setPostOrderBy,
    setPostCursor,

    // comment params 관련
    commentParams: {
      page,
      pageSize,
    },
    setPage,
    setPageSize,

    // scrap params 관련
    scrapParams: {
      scrapOrderBy,
      ScrapCursor,
      isPublic,
      isRecruiting,
    },
    setScrapOrderBy,
    setScrapCursor,
    setIsPublic,
    setIsRecruiting,
  };
};

export default useMyPageParams;
