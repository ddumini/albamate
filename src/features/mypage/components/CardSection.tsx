import { ReactNode } from 'react';

interface CardSectionProps<T extends { id: number }> {
  cardInfo: T[];
  renderCard: (item: T) => ReactNode;
  cardWrapStyle?: string;
}

const CardSection = <T extends { id: number }>({
  cardInfo,
  renderCard,
  cardWrapStyle,
}: CardSectionProps<T>) => {
  return (
    <section className={cardWrapStyle}>
      {cardInfo.map(item => (
        <div key={item.id}>{renderCard(item)}</div>
      ))}
    </section>
  );
};

export default CardSection;
