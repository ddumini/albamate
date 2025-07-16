'use client';

import FloatingButton from '@/shared/components/common/button/FloatingButton';
import FloatingButtonContainer from '@/shared/components/common/button/FloatingButtonContainer';

const FloatingFormButton = () => (
  <FloatingButtonContainer>
    <FloatingButton href="/forms/create" text="폼 만들기" type="addForm" />
  </FloatingButtonContainer>
);

export default FloatingFormButton;
