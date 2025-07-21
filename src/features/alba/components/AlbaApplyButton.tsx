/* eslint-disable react/prop-types */
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

interface AlbaApplyButtonProps {
  myId: number; // 현재 로그인한 사용자 ID
  ownerId: number; // 알바 글 작성자 ID
}

const AlbaApplyButton: React.FC<AlbaApplyButtonProps> = ({ myId, ownerId }) => {
  const isOwner = myId === ownerId;

  return (
    <div className="flex flex-col gap-10 py-16">
      <PrimaryButton
        className="flex w-full max-w-640 py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/edit.svg' : '/icons/writing.svg'}
        label={isOwner ? '수정하기' : '지원하기'}
        type="button"
        variant="solid"
      />
      <PrimaryButton
        className="w-full max-w-640 py-20 text-lg lg:text-xl"
        iconSrc={isOwner ? '/icons/delete.svg' : '/icons/apply-list.svg'}
        label={isOwner ? '삭제하기' : '내 지원 내역 보기'}
        type="button"
        variant="outline"
      />
    </div>
  );
};

export default AlbaApplyButton;
