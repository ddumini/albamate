import { useRouter } from 'next/navigation';

import useViewport from '@/shared/hooks/useViewport';
import useModalStore from '@/shared/store/useModalStore';

import ApplicationModal from '../modal/ApplicationModal';
import FormDeleteModal from '../modal/FormDeleteModal';
import ApplicantButtons from './ApplicantButtons';
import OwnerButtons from './OwnerButtons';

interface ApplyButtonProps {
  isOwner: boolean;
  id: number;
}

const ApplyButton = ({ isOwner, id }: ApplyButtonProps) => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const { isTablet, isMobile } = useViewport();

  const handleApply = () => router.push(`/apply/${id}`);
  const handleModify = () => router.push(`/addform?formId=${id}`);
  const handleApplicationModal = () => openModal(<ApplicationModal id={id} />);
  const handleFormDeleteModal = () => openModal(<FormDeleteModal />);

  const isSmallScreen = isMobile || isTablet;

  return (
    <div
      className={` ${isSmallScreen ? 'fixed right-0 bottom-0 left-0 z-50 flex flex-row gap-10 bg-white/70 px-16 py-12 backdrop-blur lg:hidden dark:bg-gray-900/70' : 'hidden flex-col gap-10 py-16 lg:flex'} `}
    >
      {isOwner ? (
        <OwnerButtons
          isSmall={isSmallScreen}
          onDelete={handleFormDeleteModal}
          onModify={handleModify}
        />
      ) : (
        <ApplicantButtons
          isSmall={isSmallScreen}
          onApply={handleApply}
          onViewApplication={handleApplicationModal}
        />
      )}
    </div>
  );
};

export default ApplyButton;
