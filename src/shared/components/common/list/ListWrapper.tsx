import React from 'react';

interface Identifiable {
  id: number | string;
}

interface ListWrapperProps<T extends Identifiable> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const ListWrapper = <T extends Identifiable>({
  items,
  renderItem,
  children,
  className = '',
}: ListWrapperProps<T>) => {
  return (
    <div className={className}>
      <div className="flex flex-wrap justify-start gap-24">
        {items.map(item => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
        {children}
      </div>
    </div>
  );
};

export default ListWrapper;
