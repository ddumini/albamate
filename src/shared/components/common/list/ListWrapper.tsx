import React from 'react';

import { cn } from '@/shared/lib/cn'; // className 유틸

interface Identifiable {
  id: number | string;
}

interface ListWrapperProps<T extends Identifiable> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * 제네릭 리스트 컴포넌트로, 다양한 데이터 타입을 받아서 렌더링할 수 있습니다.
 *
 * @template T - `id` 속성을 가진 객체 타입
 * @param {T[]} items - 렌더링할 아이템 배열
 * @param {(item: T) => React.ReactNode} renderItem - 각 아이템을 렌더링하는 함수
 * @param {React.ReactNode} [children] - 아이템 리스트 외에 추가적으로 렌더링할 자식 요소
 * @param {string} [className] - 외부에서 전달할 클래스명
 *
 * @example
 * <ListWrapper
 *   items={albaList}
 *   renderItem={item => <AlbaCard key={item.id} item={item} />}
 * >
 *   {isOwner && <FloatingFormButton />}
 * </ListWrapper>
 */
const ListWrapper = <T extends Identifiable>({
  items,
  renderItem,
  children,
  className,
}: ListWrapperProps<T>) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-x-24 gap-y-64 sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {items.map(item => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
      {children}
    </div>
  );
};

export default ListWrapper;
