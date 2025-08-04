import PrimaryButton from '@common/button/PrimaryButton';
import Modal from '@common/modal/Modal';
import Image from 'next/image';

import useModalStore from '@/shared/store/useModalStore';

interface DeleteConfirmModalProps {
  title: string;
  onConfirm: () => Promise<void>; // 비동기 함수로 변경
  isPending?: boolean;
}

const DeleteConfirmModal = ({
  title,
  onConfirm,
  isPending = false, // 기본값 추가
}: DeleteConfirmModalProps) => {
  const { closeModal } = useModalStore();

  const handleConfirm = async () => {
    try {
      await onConfirm(); // 비동기 함수 완료 대기
      closeModal(); // 성공 시에만 모달 닫기
    } catch (error) {
      // 에러는 onConfirm 내부에서 처리되므로 여기서는 모달을 닫지 않음
      console.error('삭제 실패:', error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl p-24 text-center">
      <Modal.Header showCloseButton>
        <Image
          alt="삭제 확인"
          className="mx-auto my-20"
          height={80}
          src="/images/modal/warning.svg"
          width={80}
        />
        <div className="Text-black text-xl font-semibold">
          알바폼을 삭제할까요?
        </div>
      </Modal.Header>
      <Modal.Body>
        <p className="Text-gray text-sm underline underline-offset-3">
          "{title}" 삭제 후 정보를 복구할 수 없어요.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <PrimaryButton
            className="BG-error mt-12 h-58 w-327 rounded-md hover:brightness-90"
            disabled={isPending}
            label={isPending ? '삭제 중...' : '삭제하기'}
            type="button"
            variant="cancelSolid"
            onClick={handleConfirm}
          />
          <PrimaryButton
            className="mt-12 h-58 w-327 rounded-md border border-mint-200 bg-gray-25 text-mint-300 hover:bg-gray-100"
            disabled={isPending}
            label="취소"
            type="button"
            variant="outline"
            onClick={closeModal}
          />
        </div>
      </Modal.Footer>
    </div>
  );
};

export default DeleteConfirmModal;
