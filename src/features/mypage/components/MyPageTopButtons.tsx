'use client';

import { ReactNode, useMemo } from 'react';

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
  const infoComponent =
    role === 'OWNER' ? (
      <OwnerInfoEdit close={closeModal} />
    ) : (
      <WorkerInfoEdit close={closeModal} />
    );

  const renderModalContent = (title: string, content: ReactNode) => (
    <div className="BG-white w-375 px-24 py-20 lg:w-720 lg:px-40 lg:py-32">
      <Modal.Header>
        <h1 className="Text-black mb-20 text-2lg font-semibold lg:mb-36 lg:text-3xl">
          {title}
        </h1>
      </Modal.Header>
      <Modal.Body className="flex w-full flex-col items-center gap-y-20">
        {content}
      </Modal.Body>
    </div>
  );

  const myInfoEdit = () => {
    openModal(
      renderModalContent(
        '내 정보 수정',
        <>
          <ProfileEdit onImageChange={() => {}} />
          {infoComponent}
        </>
      )
    );
  };

  const pwChange = () => {
    openModal(
      renderModalContent('비밀번호 변경', <PwChangeForm close={closeModal} />)
    );
  };

  const dropDownItem = useMemo(
    () => [
      { value: '내 정보 수정', clickEvent: myInfoEdit },
      { value: '비밀번호 변경', clickEvent: pwChange },
    ],
    [role]
  );

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
