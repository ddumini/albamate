'use client';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Modal from '@/shared/components/common/modal/Modal';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';
import useModalStore from '@/shared/store/useModalStore';

import MyPageDropDown from './MyPageDropDown';
import OwnerInfoEdit from './OwnerInfoEdit';
import PwChangeForm from './PwChangeForm';
import WorkerInfoEdit from './WorkerInfoEdit';

interface MyPageTopButtonsProps {
  role: string;
}

const MyPageTopButtons = ({ role }: MyPageTopButtonsProps) => {
  const { openModal, closeModal } = useModalStore();

  const dropDownItem = [
    { value: '내 정보 수정', clickEvent: () => myInfoEdit() },
    { value: '비밀번호 변경', clickEvent: () => pwChange() },
  ];

  const myInfoEdit = () => {
    openModal(
      <div className="w-375 p-24 lg:w-720 lg:px-40 lg:py-32">
        <Modal.Header>
          <h1 className="mb-24 text-2lg font-semibold lg:mb-40 lg:text-3xl">
            내 정보 수정
          </h1>
        </Modal.Header>
        <Modal.Body className="flex w-full flex-col items-center gap-y-24 lg:mb-40">
          <ProfileEdit onImageChange={() => {}} />
          {role === 'OWNER' ? (
            <OwnerInfoEdit close={closeModal} />
          ) : (
            <WorkerInfoEdit close={closeModal} />
          )}
        </Modal.Body>
      </div>
    );
  };

  const pwChange = () => {
    openModal(
      <div className="w-375 p-24 lg:w-720 lg:px-40 lg:py-32">
        <Modal.Header>
          <h1 className="mb-24 text-2lg font-semibold lg:mb-40 lg:text-3xl">
            비밀번호 변경
          </h1>
        </Modal.Header>
        <Modal.Body className="flex w-full flex-col items-center gap-y-24 lg:mb-40">
          <PwChangeForm close={closeModal} />
        </Modal.Body>
      </div>
    );
  };

  return (
    <>
      <div className="hidden items-center justify-center gap-16 lg:inline-flex">
        <PrimaryButton
          className="h-58 w-180 py-16 text-2lg font-semibold"
          label="내 정보 수정"
          type="button"
          variant="solid"
          onClick={() => myInfoEdit()}
        />
        <PrimaryButton
          className="h-58 w-180 py-16 text-2lg font-semibold"
          label="비밀번호 변경"
          type="button"
          variant="outline"
          onClick={() => pwChange()}
        />
      </div>
      <MyPageDropDown className="lg:hidden" items={dropDownItem} />
    </>
  );
};
export default MyPageTopButtons;
