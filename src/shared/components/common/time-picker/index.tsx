import { useState } from 'react';

import TimeSelect from './TimeSelect'; // 경로는 실제 파일 위치로 조정

const TimePicker = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');

  return (
    <div className="flex gap-6">
      <TimeSelect label="근무 시작" value={startTime} onChange={setStartTime} />
      <TimeSelect label="근무 종료" value={endTime} onChange={setEndTime} />
    </div>
  );
};

export default TimePicker;
