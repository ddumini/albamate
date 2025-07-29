import { useRouter } from 'next/navigation';

import useViewport from '@/shared/hooks/useViewport';
import useModalStore from '@/shared/store/useModalStore';

import ApplicantButtons from './ApplicantButtons';
import ApplicationModal from './modal/ApplicationModal';
import FormDeleteModal from './modal/FormDeleteModal';
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

  return isSmallScreen ? (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex flex-row gap-10 bg-white/70 px-16 py-12 backdrop-blur lg:hidden dark:bg-gray-900/70">
      {isOwner ? (
        <OwnerButtons
          isSmall
          onDelete={handleFormDeleteModal}
          onModify={handleModify}
        />
      ) : (
        <ApplicantButtons
          isSmall
          onApply={handleApply}
          onViewApplication={handleApplicationModal}
        />
      )}
    </div>
  ) : (
    <div className="hidden flex-col gap-10 py-16 lg:flex">
      {isOwner ? (
        <OwnerButtons
          isSmall={false}
          onDelete={handleFormDeleteModal}
          onModify={handleModify}
        />
      ) : (
        <ApplicantButtons
          isSmall={false}
          onApply={handleApply}
          onViewApplication={handleApplicationModal}
        />
      )}
    </div>
  );
};

export default ApplyButton;
