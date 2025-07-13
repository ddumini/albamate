'use client';

import { useState } from 'react';

import Checkbox from '@/shared/components/common/button/Checkbox';
import RadioButton, {
  RadioOption,
} from '@/shared/components/common/button/RadioButton';

const RADIO_OPTIONS: RadioOption[] = [
  { value: 'REJECTED', label: '거절' },
  { value: 'INTERVIEW_PENDING', label: '면접대기' },
  { value: 'INTERVIEW_COMPLETED', label: '면접 완료' },
  { value: 'HIRED', label: '채용 완료', disabled: true },
];

const HyeranClientTest = () => {
  // 라디오 버튼 상태
  const [selected, setSelected] = useState('');

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(true);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1>라디오 버튼 컴포넌트</h1>
        <RadioButton
          legend="현재 진행상태를 알려주세요."
          name="applicationStatus"
          options={RADIO_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </section>
      <section>
        <h1>체크박스 컴포넌트</h1>
        <Checkbox
          checked={checked1}
          id="test1"
          label="첫 번째 옵션"
          onChange={setChecked1}
        />
        <Checkbox
          checked={checked2}
          id="test2"
          label="두 번째 옵션 (기본 선택)"
          onChange={setChecked2}
        />
        <Checkbox
          disabled
          checked={checked3}
          id="test3"
          label="세 번째 옵션"
          onChange={setChecked3}
        />
        <Checkbox
          disabled
          checked={checked4}
          id="test4"
          label="네 번째 옵션"
          onChange={setChecked4}
        />
      </section>
    </div>
  );
};

export default HyeranClientTest;
