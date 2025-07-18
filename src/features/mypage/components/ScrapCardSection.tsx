'use client';

import { ScrapCardProps, ScrapItem } from '@/shared/types/mypage';

import MyScrapCard from './MyScrapCard';

const ScrapCardSection = ({ cardInfo }: ScrapCardProps) => {
  const cardDropdown = [
    { value: '지원하기', clickEvent: () => console.error('') },
    { value: '스크랩 취소', clickEvent: () => console.error('') },
  ];
  return (
    <section className="grid-rows-auto relative grid grid-cols-1 place-items-center items-center lg:flex-row lg:flex-wrap lg:gap-x-25 lg:gap-y-45 xl:grid-cols-3">
      {cardInfo.map((item: ScrapItem) => {
        return (
          <MyScrapCard
            key={item.id}
            cardContent={item}
            dropdownItem={cardDropdown}
          />
        );
      })}
    </section>
  );
};
export default ScrapCardSection;
