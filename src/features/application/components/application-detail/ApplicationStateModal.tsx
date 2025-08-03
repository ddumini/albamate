'use client';

import PrimaryButton from '@common/button/PrimaryButton';
import Modal from '@common/modal/Modal';
import { useState } from 'react';

import RadioButton, {
  RadioOption,
} from '@/shared/components/common/button/RadioButton';
import { usePopupStore } from '@/shared/store/popupStore';
import useModalStore from '@/shared/store/useModalStore';

import { useUpdateApplicationStatusMutation } from '../../queries/queries';
import { ApplicationStatus } from '../../types/application';

interface ApplicationStateModalProps {
  currentStatus: string;
  applicationId: string;
}

const ApplicationStateModal = ({
  currentStatus,
  applicationId,
}: ApplicationStateModalProps) => {
  const { closeModal } = useModalStore();
  const { showPopup } = usePopupStore();

  const [selected, setSelected] = useState(currentStatus);

  const RADIO_OPTIONS: RadioOption[] = [
    { value: 'REJECTED', label: '거절' },
    { value: 'INTERVIEW_PENDING', label: '면접대기' },
    { value: 'INTERVIEW_COMPLETED', label: '면접 완료' },
    { value: 'HIRED', label: '채용 완료' },
  ];

  const updateStatusMutation = useUpdateApplicationStatusMutation({
    onSuccess: () => {
      showPopup('지원 상태가 변경되었습니다.', 'success');
    },
    onError: error => {
      console.error('실패!', error);
      showPopup('상태 변경에 실패했습니다.', 'error');
    },
  });

  const handleStateSubmit = () => {
    closeModal();

    updateStatusMutation.mutate({
      applicationId,
      status: selected as ApplicationStatus,
    });
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
          disabled={updateStatusMutation.isPending}
          label="선택하기"
          type="button"
          variant="solid"
          onClick={handleStateSubmit}
        />
      </Modal.Footer>
    </div>
  );
};

export default ApplicationStateModal;
