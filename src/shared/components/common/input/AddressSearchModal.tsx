'use client';

import DaumPostcode from 'react-daum-postcode';

import useModalStore from '@/shared/store/useModalStore';

import Modal from '../modal/Modal';

interface AddressSearchModalProps {
  children: React.ReactNode;
  currentAddress?: string;
  onAddressSelect: (address: string) => void;
}

const AddressSearchModal = ({
  children,
  currentAddress,
  onAddressSelect,
}: AddressSearchModalProps) => {
  const { openModal, closeModal } = useModalStore();

  const handleAddressSelect = (data: any) => {
    const address = data.address;
    onAddressSelect(address);
    closeModal();
  };

  const handleClick = () => {
    openModal(
      <div className="p-20">
        <Modal.Header showCloseButton className="pb-20">
          주소 검색
        </Modal.Header>
        <Modal.Body>
          {/* 현재 주소가 있으면 표시 */}
          {currentAddress && (
            <div className="mb-16 rounded bg-gray-50 p-12 text-sm text-gray-600">
              현재 주소: {currentAddress}
            </div>
          )}
          <div className="h-500 w-full">
            <DaumPostcode
              autoClose={false}
              style={{ height: '100%' }}
              onComplete={handleAddressSelect}
              // 현재 주소를 초기값으로 설정 (지원하는 경우)
              defaultQuery={currentAddress}
            />
          </div>
        </Modal.Body>
      </div>
    );
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default AddressSearchModal;
