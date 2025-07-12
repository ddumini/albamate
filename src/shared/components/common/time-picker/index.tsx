import { useState } from 'react';

import TimeSelect from './TimeSelect';

const TimePicker = () => {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');

  return (
    <div className="flex gap-27 lg:gap-36">
      <TimeSelect label="근무 시작" value={startTime} onChange={setStartTime} />
      <TimeSelect label="근무 종료" value={endTime} onChange={setEndTime} />
    </div>
  );
};

export default TimePicker;
