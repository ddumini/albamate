import { Fragment, ReactNode } from 'react';

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
  const uniqueCardInfo = Array.from(
    new Map(cardInfo.map(item => [item.id, item])).values()
  );
  return (
    <section className={cardWrapStyle}>
      {uniqueCardInfo.map(item => (
        <Fragment key={item.id}>{renderCard(item)}</Fragment>
      ))}
    </section>
  );
};

export default CardSection;
