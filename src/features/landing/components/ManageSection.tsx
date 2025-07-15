'use client';

import SubTitle from './SubTitle';

const subTitles = [
  '알바폼 관리 페이지에서',
  '지원 현황을 확인하고',
  '지원자별 상태를 관리할 수 있습니다.',
];

const ManageSection = () => {
  return (
    <section className="relative z-10 flex h-screen flex-col justify-center overflow-hidden bg-transparent">
      <div className="mx-auto w-1140 justify-between">
        <h2 className="mb-40 text-5xl font-bold text-[#EE893F]">
          한 곳에서 쉽게 관리하세요
        </h2>
        <SubTitle className="text-[#F9C675]" subTitles={subTitles} />
      </div>
    </section>
  );
};

export default ManageSection;
