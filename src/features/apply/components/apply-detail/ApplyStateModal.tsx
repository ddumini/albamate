'use client';

import PrimaryButton from '@common/button/PrimaryButton';
import Modal from '@common/modal/Modal';
import { useState } from 'react';

import RadioButton, {
  RadioOption,
} from '@/shared/components/common/button/RadioButton';
import useModalStore from '@/shared/store/useModalStore';

const ApplyStateModal = () => {
  const { closeModal } = useModalStore();

  const [selected, setSelected] = useState('INTERVIEW_PENDING');

  const RADIO_OPTIONS: RadioOption[] = [
    { value: 'REJECTED', label: '거절' },
    { value: 'INTERVIEW_PENDING', label: '면접대기' },
    { value: 'INTERVIEW_COMPLETED', label: '면접 완료' },
    { value: 'HIRED', label: '채용 완료' },
  ];

  const handleStateSubmit = () => {
    // TODO: API 호출로 실제 상태 업데이트
    console.log('선택된 상태:', selected);
    closeModal();
  };

  return (
    <div className="flex w-full flex-col gap-25 rounded-xl bg-gray-25 p-24 dark:bg-gray-900">
      <Modal.Header showCloseButton={false}>
        <div className="flex flex-col gap-8 text-center lg:gap-16">
          <h2 className="text-2lg lg:text-2xl dark:text-white">
            진행상태 선택
          </h2>
          <p className="text-md text-gray-400 lg:text-xl">
            현재 진행상태를 알려주세요.
          </p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <RadioButton
          legend="현재 진행상태를 알려주세요."
          name="applicationStatus"
          options={RADIO_OPTIONS}
          value={selected}
          onChange={setSelected}
        />
      </Modal.Body>
      <Modal.Footer className="mt-5">
        <PrimaryButton
          className="h-58 w-full py-20 text-lg lg:text-xl"
          label="취소"
          type="button"
          variant="cancelOutline"
          onClick={closeModal}
        />
        <PrimaryButton
          className="h-58 w-full py-20 text-lg lg:text-xl"
          label="선택하기"
          type="button"
          variant="solid"
          onClick={handleStateSubmit}
        />
      </Modal.Footer>
    </div>
  );
};

export default ApplyStateModal;
