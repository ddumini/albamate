interface IndicatorProps {
  current: number;
  total: number;
}

const Indicator = ({ current, total }: IndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-22">
      {Array.from({ length: total }, (_, i) => {
        return (
          <div
            key={`${i}c`}
            className={`rounded-full ${current === i ? "w-16 h-16 bg-gray-300/60" : "w-12 h-12 bg-line-100/60"}`}
          />
        );
      })}
    </div>
  );
};

export default Indicator;
