'use client';

import { ScrapInfo } from '@/shared/types/mypage';

import MyScrapCard from './MyScrapCard';

const ScrapCardSection = ({ cardInfo }: { cardInfo: ScrapInfo }) => {
  const cardDropdown = [
    { value: '수정하기', clickEvent: () => console.error('') },
    { value: '삭제하기', clickEvent: () => console.error('') },
  ];
  return (
    <section className="grid-rows-auto relative grid grid-cols-1 items-center overflow-hidden lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3">
      <MyScrapCard cardContent={cardInfo} dropdownItem={cardDropdown} />
    </section>
  );
};
export default ScrapCardSection;
