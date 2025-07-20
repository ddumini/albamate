interface IndicatorProps {
  current: number;
  total: number;
  onIndicatorClick?: (index: number) => void;
}

const Indicator = ({ current, total, onIndicatorClick }: IndicatorProps) => {
  return (
    <div className="hidden items-center justify-center gap-22 lg:flex">
      {Array.from({ length: total }, (_, i) => {
        return (
          <button
            key={`${i}`}
            className={`rounded-full ${current === i ? 'h-16 w-16 bg-gray-300/60' : 'h-12 w-12 bg-line-100/60'}`}
            type="button"
            onClick={() => onIndicatorClick?.(i)}
          />
        );
      })}
    </div>
  );
};

export default Indicator;
