import Modal from '@common/modal/Modal';
import { ReactNode } from 'react';

const renderModalContent = (title: string, content: ReactNode) => {
  return (
    <div className="BG-white w-375 px-24 py-20 lg:w-720 lg:px-40 lg:py-32">
      <Modal.Header>
        <h1 className="Text-black mb-20 text-2lg font-semibold lg:mb-53 lg:text-3xl">
          {title}
        </h1>
      </Modal.Header>
      <Modal.Body className="flex w-full flex-col items-center gap-y-20">
        {content}
      </Modal.Body>
    </div>
  );
};

export default renderModalContent;
