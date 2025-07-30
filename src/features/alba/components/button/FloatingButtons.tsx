'use client';

import FloatingButton from '@common/button/FloatingButton';
import FloatingButtonContainer from '@common/button/FloatingButtonContainer';

import { addBookmark, removeBookmark } from '@/features/alba/api/bookmark';

interface Props {
  isBookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  onToggleOwner: () => void;
  formId: number;
  onSigninRedirect: () => void;
}

const FloatingButtons = ({
  isBookmarked,
  setIsBookmarked,
  isLoggedIn,
  onToggleOwner,
  formId,
  onSigninRedirect,
}: Props) => {
  const handleBookmarkToggle = async () => {
    if (!isLoggedIn) {
      onSigninRedirect();
      return;
    }

    try {
      if (!isBookmarked) {
        await addBookmark(formId);
        alert('스크랩했어요!');
      } else {
        await removeBookmark(formId);
        alert('스크랩을 취소했어요.');
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FloatingButtonContainer position="right-center">
      <FloatingButton
        isBookmarked={isBookmarked}
        type="bookmark"
        onClick={handleBookmarkToggle}
      />
      <FloatingButton type="share" />
      <FloatingButton type="addAlbatalk" onClick={onToggleOwner} />
    </FloatingButtonContainer>
  );
};

export default FloatingButtons;
