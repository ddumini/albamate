'use client';

import PrimaryButton from '@common/button/PrimaryButton';

import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';
import useModalStore from '@/shared/store/useModalStore';

import { useMyProfileQuery } from '../queries';
import renderModalContent from '../utils/renderModalContent';
import OwnerInfoEdit from './OwnerInfoEdit';
import PwChangeForm from './PwChangeForm';
import WorkerInfoEdit from './WorkerInfoEdit';

const MyPageTopButtons = ({ isOwner }: { isOwner: string | null }) => {
  const { data: userInfo, isLoading: myProfileLoading } = useMyProfileQuery();
  const { openModal, closeModal } = useModalStore();

  const infoComponent =
    isOwner === 'OWNER' ? (
      <OwnerInfoEdit close={closeModal} userInfo={userInfo?.data} />
    ) : (
      <WorkerInfoEdit close={closeModal} userInfo={userInfo?.data} />
    );

  const myInfoEdit = () => {
    openModal(renderModalContent('내 정보 수정', <>{infoComponent}</>));
  };

  const pwChange = () => {
    openModal(
      renderModalContent('비밀번호 변경', <PwChangeForm close={closeModal} />)
    );
  };

  const dropDownItem = [
    { label: '내 정보 수정', onClick: () => myInfoEdit() },
    { label: '비밀번호 변경', onClick: () => pwChange() },
  ];

  if (myProfileLoading) return null;

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
      <KebabMenuDropdown className="lg:hidden" options={dropDownItem} />
    </>
  );
};
export default MyPageTopButtons;
