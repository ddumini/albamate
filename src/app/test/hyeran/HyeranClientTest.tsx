'use client';

import { useState } from 'react';

import Checkbox from '@/shared/components/common/button/Checkbox';
import FloatingButton from '@/shared/components/common/button/FloatingButton';
import FloatingButtonContainer from '@/shared/components/common/button/FloatingButtonContainer';
import RadioButton, {
  RadioOption,
} from '@/shared/components/common/button/RadioButton';
import ThemeToggle from '@/shared/components/ThemeToggle';

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

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    if (isBookmarked) {
      // 북마크 제거 API 호출 추후 구현
    } else {
      // 북마크 추가 API 호출 추후 구현
    }
    setIsBookmarked(newBookmarkState);
  };

  return (
    <div className="flex flex-col gap-20">
      <ThemeToggle />
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
      <section>
        <h1>FloatingButton</h1>
        <FloatingButton href="/forms/create" text="폼 만들기" type="addForm" />
        <FloatingButton href="/albatalk/create" type="addAlbatalk" />
        <FloatingButton
          isBookmarked={isBookmarked}
          type="bookmark"
          onClick={handleBookmarkToggle}
        />
        <FloatingButton type="share" />
        <FloatingButtonContainer position="right-center">
          <FloatingButton
            isBookmarked={isBookmarked}
            type="bookmark"
            onClick={handleBookmarkToggle}
          />
          <FloatingButton type="share" />
        </FloatingButtonContainer>
        <FloatingButtonContainer>
          <FloatingButton
            href="/forms/create"
            text="폼 만들기"
            type="addForm"
          />
        </FloatingButtonContainer>
      </section>
      <section>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum
          passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like). Where
          does it come from? Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. Where can I get some? There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable. If you are going to use a passage of Lorem
          Ipsum, you need to be sure there isn't anything embarrassing hidden in
          the middle of text. All the Lorem Ipsum generators on the Internet
          tend to repeat predefined chunks as necessary, making this the first
          true generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </p>
      </section>
    </div>
  );
};

export default HyeranClientTest;
