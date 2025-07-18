'use client';

import { useState } from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useViewport from '@/shared/hooks/useViewport';

import AddformButtons from './AddformButtons';
import { MenuIndex } from './MenuItem';
import RecruitConditionForm from './RecruitConditionForm';
import RecruitContentForm from './RecruitContentForm';
import Sidebar from './Sidebar';
import TabMenu from './TabMenu';
import WorkConditionForm from './WorkConditionForm';

const AddformClient = ({ formId }: { formId?: number }) => {
  const [currentMenu, setCurrentMenu] = useState<MenuIndex>(1);
  const [writingMenu, setWritingMenu] = useState({
    1: false,
    2: false,
    3: false,
  });
  const { isDesktop } = useViewport();
  const handleMenuClick = (menuIndex: MenuIndex) => {
    setCurrentMenu(menuIndex);
  };
  return (
    <div className="relative flex w-full justify-center lg:pt-40 lg:pl-20">
      {isDesktop && (
        <Sidebar
          className="3xl:absolute 3xl:left-1/2 3xl:-ml-360 3xl:-translate-x-full"
          currentMenu={currentMenu}
          isEdit={!!formId}
          writingMenu={writingMenu}
          onMenuClick={handleMenuClick}
        />
      )}
      <div className="w-full max-w-375 shrink-0 lg:max-w-720 3xl:mx-auto">
        <header className="flex items-center justify-between px-24 py-20 lg:px-40 lg:py-35">
          <h1 className="text-xl font-semibold lg:text-3xl">
            {formId ? '알바폼 수정하기' : '알바폼 만들기'}
          </h1>
          <PrimaryButton
            className="h-40 w-80 text-md text-gray-25 lg:h-56 lg:w-122 lg:text-xl"
            label="작성 취소"
            type="button"
            variant="cancelSolid"
          />
        </header>
        {isDesktop || (
          <TabMenu
            className="mx-24 my-10"
            currentMenu={currentMenu}
            writingMenu={writingMenu}
            onMenuClick={handleMenuClick}
          />
        )}
        <RecruitContentForm className={currentMenu === 1 ? '' : 'hidden'} />
        <RecruitConditionForm className={currentMenu === 2 ? '' : 'hidden'} />
        <WorkConditionForm className={currentMenu === 3 ? '' : 'hidden'} />
        {isDesktop || (
          <AddformButtons className="mx-24 my-10" isEdit={!!formId} />
        )}
      </div>
    </div>
  );
};
export default AddformClient;
