'use client';

import { useState } from 'react';

import RadioButton from '@/shared/components/common/button/RadioButton';

const Hyeran = () => {
  const [selected, setSelected] = useState('');
  const options = [
    { value: 'REJECTED', label: '거절' },
    { value: 'INTERVIEW_PENDING', label: '면접대기' },
    { value: 'INTERVIEW_COMPLETED', label: '면접 완료' },
    { value: 'HIRED', label: '채용 완료', disabled: true },
  ];
  return (
    <div className="flex flex-col gap-10">
      <h1>라디오 버튼 컴포넌트</h1>
      <RadioButton
        legend="현재 진행상태를 알려주세요."
        name="applicationStatus"
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export default Hyeran;
