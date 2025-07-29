'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useViewport from '@/shared/hooks/useViewport';

import { useAddformMutation } from '../queries/addformQueries';
import { createFormRequestSchema } from '../schema/addform.schema';
import AddformButtons from './AddformButtons';
import { MenuIndex } from './MenuItem';
import RecruitConditionForm from './RecruitConditionForm';
import RecruitContentForm from './RecruitContentForm';
import Sidebar from './Sidebar';
import TabMenu from './TabMenu';
import WorkConditionForm from './WorkConditionForm';

const AddformClient = ({ formId }: { formId?: string }) => {
  const [currentMenu, setCurrentMenu] = useState<MenuIndex>(1);
  const [writingMenu, setWritingMenu] = useState({
    1: true,
    2: true,
    3: false,
  });
  const { isDesktop } = useViewport();
  const methods = useForm({
    resolver: zodResolver(createFormRequestSchema),
    mode: 'onChange',
    defaultValues: {
      imageUrls: [],
      isNegotiableWorkDays: false,
      isPublic: false,
    },
  });

  const { mutate, isPending } = useAddformMutation();

  const handleSubmit = methods.handleSubmit(data => mutate(data));

  const handleMenuClick = (menuIndex: MenuIndex) => {
    setCurrentMenu(menuIndex);
  };

  return (
    <FormProvider {...methods}>
      <div className="relative flex w-full justify-center lg:pt-40 lg:pl-20">
        {isDesktop && (
          <Sidebar
            className="3xl:absolute 3xl:left-1/2 3xl:-ml-360 3xl:-translate-x-full"
            currentMenu={currentMenu}
            isEdit={!!formId}
            isSubmitting={isPending}
            writingMenu={writingMenu}
            onMenuClick={handleMenuClick}
            onSubmit={handleSubmit}
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
          <form>
            <RecruitContentForm className={currentMenu === 1 ? '' : 'hidden'} />
            <RecruitConditionForm
              className={currentMenu === 2 ? '' : 'hidden'}
            />
            <WorkConditionForm className={currentMenu === 3 ? '' : 'hidden'} />
          </form>
          {isDesktop || (
            <AddformButtons
              className="mx-24 my-10"
              isEdit={!!formId}
              isSubmitting={isPending}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
};
export default AddformClient;
