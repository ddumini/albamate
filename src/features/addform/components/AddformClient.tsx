'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAddformWritingMenu } from '@/features/addform/hooks';
import {
  useAddformMutation,
  useEditformMutation,
  useImageMutation,
} from '@/features/addform/queries/mutations';
import {
  CreateFormRequest,
  createFormRequestSchema,
} from '@/features/addform/schema/addform.schema';
import { useAlbaformDetailQuery } from '@/features/application/queries/queries';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { useSessionUtils } from '@/shared/lib/auth/use-session-utils';
import { usePopupStore } from '@/shared/store/popupStore';

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
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const { showPopup } = usePopupStore();

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
    setValue,
    getValues,
  } = methods;

  //로컬 스토리지에서 임시저장 데이터 불러오기
  useEffect(() => {
    if (formId) return;
    const draft = localStorage.getItem('addform-draft');
    if (draft) {
      const parsed = JSON.parse(draft);
      const { imageUrls, ...formValues } = parsed;
      Object.entries(formValues).forEach(([key, value]) => {
        setValue(
          key as keyof CreateFormRequest,
          value as CreateFormRequest[keyof CreateFormRequest],
          { shouldDirty: true, shouldValidate: true }
        );
      });
      setUploadedImageUrls(imageUrls);
      showPopup('임시 저장한 데이터를 가져왔습니다', 'success');
    }
  }, [setValue, showPopup, formId]);

  const { data: formData, isLoading: isFormLoading } = useAlbaformDetailQuery(
    formId || ''
  );
  const { user } = useSessionUtils();
  const router = useRouter();

  //수정하기 페이지 로직
  useEffect(() => {
    if (!formId || !formData || !user) return;

    //내가 만든 폼이 아니라면 리스트 페이지로 이동
    const isOwner = formData.ownerId === user.id;
    if (!isOwner) {
      showPopup('접근 권한이 없습니다.', 'error');
      router.replace('/albalist');
      return;
    }

    const { imageUrls, ...formValues } = formData;
    const allowedKeys = [
      ...Object.keys(recruitContentDefault).filter(key => key !== 'imageUrls'),
      ...Object.keys(recruitConditionDefault),
      ...Object.keys(workContentDefault),
    ];
    Object.entries(formValues).forEach(([key, value]) => {
      if (allowedKeys.includes(key)) {
        setValue(
          key as keyof CreateFormRequest,
          value as CreateFormRequest[keyof CreateFormRequest],
          { shouldDirty: true, shouldValidate: true }
        );
      }
    });
    setUploadedImageUrls(imageUrls || []);
  }, [formId, formData, user, setValue, router, showPopup]);

  useAddformWritingMenu({ currentFiles, dirtyFields, setWritingMenu });

  const { mutateAsync: imageMutate, isPending: isImagePending } =
    useImageMutation();
  const { mutate: addformMutate, isPending: isAddformPending } =
    useAddformMutation();
  const { mutate: editformMutate, isPending: isEditformPending } =
    useEditformMutation();

  const handleSubmit = async () => {
    try {
      const results = await Promise.all(
        currentFiles.map(file => imageMutate(file))
      );
      const imageUrls = [
        ...uploadedImageUrls,
        ...results.map(result => result.data.url),
      ];
      setValue('imageUrls', imageUrls);
      localStorage.removeItem('addform-draft');
      if (formId) {
        editformMutate({ formId: Number(formId), form: getValues() });
        showPopup('알바폼 수정이 완료되었습니다.', 'success');
      } else {
        addformMutate(getValues());
        showPopup('알바폼 생성이 완료되었습니다.', 'success');
      }
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
      showPopup('알바폼 생성 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleMenuClick = (menu: Menu) => {
    setCurrentMenu(menu);
  };

  const handleImageChange = (files: File[]) => {
    setCurrentFiles(files);
  };

  const handleSave = async () => {
    try {
      const results = await Promise.all(
        currentFiles.map(file => imageMutate(file))
      );
      const imageUrls = [
        ...uploadedImageUrls,
        ...results.map(result => result.data.url),
      ];
      const values = getValues();
      const draft = {
        ...values,
        imageUrls,
      };
      localStorage.setItem('addform-draft', JSON.stringify(draft));
      showPopup('알바폼이 임시 저장되었습니다.', 'success');
    } catch (error) {
      console.error('임시 저장 중 오류 발생:', error);
      showPopup('임시 저장 중 오류가 발생했습니다.', 'error');
    }
  };

  if (isFormLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600">폼을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="relative flex w-full justify-center lg:pt-40 lg:pl-20">
        <Sidebar
          className="hidden lg:flex 3xl:absolute 3xl:left-1/2 3xl:-ml-360 3xl:-translate-x-full"
          currentMenu={currentMenu}
          isEdit={!!formId}
          isSubmitting={isImagePending || isAddformPending || isEditformPending}
          writingMenu={writingMenu}
          onMenuClick={handleMenuClick}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />

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

          <TabMenu
            className="mx-24 my-10 lg:hidden"
            currentMenu={currentMenu}
            writingMenu={writingMenu}
            onMenuClick={handleMenuClick}
          />

          <form>
            <RecruitContentForm
              className={currentMenu === 'recruitContent' ? '' : 'hidden'}
              setUploadedImageUrls={setUploadedImageUrls}
              uploadedImageUrls={uploadedImageUrls}
              onImageChange={handleImageChange}
            />
            <RecruitConditionForm
              className={currentMenu === 'recruitCondition' ? '' : 'hidden'}
            />
            <WorkConditionForm
              className={currentMenu === 'workCondition' ? '' : 'hidden'}
            />
          </form>

          <AddformButtons
            className="mx-24 my-10 lg:hidden"
            isEdit={!!formId}
            isSubmitting={
              isImagePending || isAddformPending || isEditformPending
            }
            onSave={handleSave}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </FormProvider>
  );
};
export default AddformClient;
