import React from 'react';

interface ListWrapperProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  children?: React.ReactNode; // 예: FloatingFormButton 같은 추가 요소
  itemsPerRow?: number; // 기본 6개
  className?: string;
}

const ListWrapper = <T,>({
  items,
  renderItem,
  children,
  itemsPerRow = 6,
  className = '',
}: ListWrapperProps<T>) => {
  // flex-wrap + gap 조절 + 아이템 넓이 조절 (6개 기준)
  const itemWidthClass = `w-[calc((100% - ${(itemsPerRow - 1) * 24}px)/${itemsPerRow})]`;

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-start gap-24">
        {items.map(item => (
          <div key={(item as any).id} className={itemWidthClass}>
            {renderItem(item)}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};

export default ListWrapper;
