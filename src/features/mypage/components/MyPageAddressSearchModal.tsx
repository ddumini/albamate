'use client';

import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

interface MyPageAddressSearchModalProps {
  children: React.ReactNode;
  currentAddress?: string;
  onAddressSelect: (address: string) => void;
}

const MyPageAddressSearchModal = ({
  children,
  currentAddress,
  onAddressSelect,
}: MyPageAddressSearchModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddressSelect = (data: any) => {
    const address = data.address;
    onAddressSelect(address);
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={handleClick}>{children}</div>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black-100/50"
          onClick={handleClose}
        >
          <div
            className="max-h-[85vh] w-fit overflow-auto rounded-3xl bg-gray-25 shadow-xl dark:bg-gray-900"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-20">
              <div className="flex items-center justify-between pb-20">
                <h2 className="text-lg font-semibold">주소 검색</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={handleClose}
                >
                  ✕
                </button>
              </div>
              <div>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPageAddressSearchModal;
