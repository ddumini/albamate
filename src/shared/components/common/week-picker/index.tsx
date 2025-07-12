import DayCheckbox from '@/shared/components/ui/DayCheckbox';

const WeekPicker = () => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  return (
    <ul className="flex gap-11">
      {days.map(day => (
        <DayCheckbox key={day} day={day} />
      ))}
    </ul>
  );
};

export default WeekPicker;
