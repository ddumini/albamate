'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAddformWritingMenu } from '@/features/addform/hooks';
import {
  useAddformMutation,
  useImageMutation,
} from '@/features/addform/queries/mutations';
import { createFormRequestSchema } from '@/features/addform/schema/addform.schema';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import useViewport from '@/shared/hooks/useViewport';

import AddformButtons from './AddformButtons';
import { Menu } from './MenuItem';
import RecruitConditionForm from './RecruitConditionForm';
import RecruitContentForm from './RecruitContentForm';
import Sidebar from './Sidebar';
import TabMenu from './TabMenu';
import WorkConditionForm from './WorkConditionForm';

const AddformClient = ({ formId }: { formId?: string }) => {
  const [currentMenu, setCurrentMenu] = useState<Menu>('recruitContent');
  const [writingMenu, setWritingMenu] = useState<Record<Menu, boolean>>({
    recruitContent: false,
    recruitCondition: false,
    workCondition: false,
  });
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);

  const { isDesktop } = useViewport();

  const recruitContentDefault = {
    title: '',
    description: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    imageUrls: [],
  };
  const recruitConditionDefault = {
    numberOfPositions: undefined,
    gender: '',
    education: '',
    age: '',
    preferred: '',
  };
  const workContentDefault = {
    location: '',
    workStartDate: '',
    workEndDate: '',
    workStartTime: '',
    workEndTime: '',
    workDays: [],
    isNegotiableWorkDays: false,
    hourlyWage: undefined,
    isPublic: false,
  };

  const methods = useForm({
    resolver: zodResolver(createFormRequestSchema),
    mode: 'onChange',
    defaultValues: {
      ...recruitContentDefault,
      ...recruitConditionDefault,
      ...workContentDefault,
    },
  });

  const {
    formState: { dirtyFields },
  } = methods;

  useAddformWritingMenu({ currentFiles, dirtyFields, setWritingMenu });

  const { mutateAsync: imageMutate, isPending: isImagePending } =
    useImageMutation();
  const { mutate: addformMutate, isPending: isAddformPending } =
    useAddformMutation();

  const handleSubmit = async () => {
    try {
      const results = await Promise.all(
        currentFiles.map(file => imageMutate(file))
      );
      methods.setValue(
        'imageUrls',
        results.map(result => result.data.url)
      );
      addformMutate(methods.getValues());
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
    }
  };

  const handleMenuClick = (menu: Menu) => {
    setCurrentMenu(menu);
  };

  const handleImageChange = (files: File[]) => {
    setCurrentFiles(files);
  };

  return (
    <FormProvider {...methods}>
      <div className="relative flex w-full justify-center lg:pt-40 lg:pl-20">
        {isDesktop && (
          <Sidebar
            className="3xl:absolute 3xl:left-1/2 3xl:-ml-360 3xl:-translate-x-full"
            currentMenu={currentMenu}
            isEdit={!!formId}
            isSubmitting={isImagePending || isAddformPending}
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
            <Link href="/albalist">
              <PrimaryButton
                className="h-40 w-80 text-md text-gray-25 lg:h-56 lg:w-122 lg:text-xl"
                label="작성 취소"
                type="button"
                variant="cancelSolid"
              />
            </Link>
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
            <RecruitContentForm
              className={currentMenu === 'recruitContent' ? '' : 'hidden'}
              onImageChange={handleImageChange}
            />
            <RecruitConditionForm
              className={currentMenu === 'recruitCondition' ? '' : 'hidden'}
            />
            <WorkConditionForm
              className={currentMenu === 'workCondition' ? '' : 'hidden'}
            />
          </form>
          {isDesktop || (
            <AddformButtons
              className="mx-24 my-10"
              isEdit={!!formId}
              isSubmitting={isImagePending || isAddformPending}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
};
export default AddformClient;
