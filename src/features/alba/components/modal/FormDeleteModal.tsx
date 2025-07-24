import Image from 'next/image';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Modal from '@/shared/components/common/modal/Modal';
import useModalStore from '@/shared/store/useModalStore';

const RecruitCloseModal = () => {
  const { closeModal } = useModalStore();

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-gray-25 p-24 text-center dark:bg-gray-900">
      <Modal.Header showCloseButton>
        <Image
          alt="모집마감"
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
          삭제 후 정보를 복구할 수 없어요.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <PrimaryButton
            className="BG-error mt-12 h-58 w-327 rounded-md hover:brightness-90"
            label="삭제하기"
            type="button"
            variant="cancelSolid"
            onClick={closeModal}
          />
          <PrimaryButton
            className="mt-12 h-58 w-327 rounded-md border border-mint-200 bg-gray-25 text-mint-300 hover:bg-gray-100"
            label="다음에 할게요"
            type="button"
            variant="outline"
            onClick={closeModal}
          />
        </div>
      </Modal.Footer>
    </div>
  );
};

export default RecruitCloseModal;
