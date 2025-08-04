'use client';

import dynamic from 'next/dynamic';

const GnbRenderer = dynamic(() => import('@common/gnb/GnbRenderer'), {
  ssr: false, // 클라이언트에서만 렌더링되도록 설정
});

const ClientGnbWrapper = () => {
  return (
    <div className="mb-48">
      <GnbRenderer />
    </div>
  );
};

export default ClientGnbWrapper;
