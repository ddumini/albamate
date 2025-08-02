import PrimaryButton from '@common/button/PrimaryButton';
import Modal from '@common/modal/Modal';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { usePopupStore } from '@/shared/store/popupStore';
import useModalStore from '@/shared/store/useModalStore';

import albaApi from '../../api/albaApi';

const FormDeleteModal = () => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const { deleteForm } = albaApi();
  const { formId } = useParams();
  const queryClient = useQueryClient();
  const { showPopup } = usePopupStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      await deleteForm(Number(formId));
      await queryClient.invalidateQueries({ queryKey: ['Albalist'] });
      await queryClient.refetchQueries({ queryKey: ['Albalist'] });

      closeModal();
      showPopup('알바폼이 삭제되었어요!', 'info');
      router.push('/albalist');
    } catch (error) {
      console.error('폼 삭제 실패:', error);
      showPopup('폼 삭제에 실패했어요!', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-xl p-24 text-center">
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
            disabled={isDeleting}
            label={isDeleting ? '삭제 중...' : '삭제하기'}
            type="button"
            variant="cancelSolid"
            onClick={handleDelete}
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

export default FormDeleteModal;
