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
          className="my-20"
          height={80}
          src="/images/modal/empty.svg"
          width={80}
        />
        <div className="Text-black text-xl font-semibold">모집 마감</div>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">모집이 종료된 알바폼입니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <PrimaryButton
          className="mt-12 h-58 w-327 rounded-md bg-mint-400"
          label="홈으로 가기"
          type="button"
          variant="solid"
          onClick={closeModal}
        />
      </Modal.Footer>
    </div>
  );
};

export default RecruitCloseModal;
