'use client';

import Image from 'next/image';
import { useState } from 'react';

import Checkbox from '@/shared/components/common/button/Checkbox';
import FloatingButton from '@/shared/components/common/button/FloatingButton';
import FloatingButtonContainer from '@/shared/components/common/button/FloatingButtonContainer';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import RadioButton, {
  RadioOption,
} from '@/shared/components/common/button/RadioButton';
import Modal from '@/shared/components/common/modal/Modal';
import ThemeToggle from '@/shared/components/ThemeToggle';
import useModalStore from '@/shared/store/useModalStore';
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

  const { openModal, closeModal } = useModalStore();

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    if (isBookmarked) {
      // 북마크 제거 API 호출 추후 구현
    } else {
      // 북마크 추가 API 호출 추후 구현
    }
    setIsBookmarked(newBookmarkState);
  };

  // 두 버튼 + 가로
  const showConfirmModal = () => {
    openModal(
      <div className="w-375 p-24 lg:w-720 lg:px-40 lg:py-32">
        <Modal.Header>
          <div className="text-2lg lg:text-3xl">사장님 정보 관리</div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="이름을 입력하세요"
                type="text"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="이메일을 입력하세요"
                type="email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                메모
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="메모를 입력하세요"
                rows={3}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton
            className="w-full max-w-640 py-20 text-lg lg:text-xl"
            label="취소"
            type="button"
            variant="cancelOutline"
            onClick={closeModal}
          />
          <PrimaryButton
            className="w-full max-w-640 py-20 text-lg lg:text-xl"
            label="수정하기"
            type="button"
            variant="solid"
            onClick={() => {
              alert('수정되었습니다!');
              closeModal();
            }}
          />
        </Modal.Footer>
      </div>
    );
  };

  // 두 버튼 + 세로
  const showDeleteModal = () => {
    openModal(
      <div className="w-360 px-24 pt-24 pb-4">
        <Modal.Body className="justify-items-center">
          <Image alt="info_icon" height={40} src="/icons/info.svg" width={40} />
          <h3>알바를 삭제할까요?</h3>
        </Modal.Body>
        <Modal.Footer direction="vertical">
          <PrimaryButton
            className="w-full max-w-640 py-20 text-lg lg:text-xl"
            disabled={false}
            label="삭제하기"
            type="button"
            variant="solid"
            onClick={() => {
              alert('삭제되었습니다!');
              closeModal();
            }}
          />
          <PrimaryButton
            className="w-full max-w-640 py-20 text-lg text-mint-300 lg:text-xl"
            label="다음에 할게요"
            type="button"
            variant="cancelOutline"
            onClick={closeModal}
          />
        </Modal.Footer>
      </div>
    );
  };

  const showFormModal = () => {
    openModal(
      <div className="w-375 p-24 lg:w-440 lg:px-40 lg:py-32">
        <Modal.Header showCloseButton className="justify-start">
          <div className="text-3xl">내 지원 내역</div>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="이름을 입력하세요"
                type="text"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="이메일을 입력하세요"
                type="email"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                메모
              </label>
              <textarea
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="메모를 입력하세요"
                rows={3}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton
            className="w-full max-w-640 py-20 text-lg lg:text-xl"
            label="지원 내역 상세보기"
            type="button"
            variant="solid"
            onClick={() => {
              closeModal();
            }}
          />
        </Modal.Footer>
      </div>
    );
  };

  const showAlertModal = () => {
    openModal(
      <div className="w-360 px-24 pt-32 pb-24">
        <Modal.Header showCloseButton>
          <div className="w-full text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <Image
                alt="info_icon"
                height={100}
                src="/icons/info.svg"
                width={100}
              />
            </div>
            모집 마감
          </div>
        </Modal.Header>
        <Modal.Body className="justify-items-center">
          모집이 종료된 알바폼입니다.
        </Modal.Body>
        <Modal.Footer>
          <PrimaryButton
            className="w-full max-w-360 py-20 text-lg lg:text-xl"
            disabled={false}
            label="홈으로 가기"
            type="button"
            variant="solid"
            onClick={() => {
              closeModal();
            }}
          />
        </Modal.Footer>
      </div>
    );
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
      <section>
        <h1>모달 구현</h1>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <button
            className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
            type="button"
            onClick={showAlertModal}
          >
            모집 마감
          </button>

          <button
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            type="button"
            onClick={showConfirmModal}
          >
            사장님 정보 관리
          </button>

          <button
            className="rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
            type="button"
            onClick={showDeleteModal}
          >
            삭제 확인 모달
          </button>

          <button
            className="rounded bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
            type="button"
            onClick={showFormModal}
          >
            내 지원 내역 모달
          </button>
        </div>
      </section>
    </div>
  );
};

export default HyeranClientTest;
