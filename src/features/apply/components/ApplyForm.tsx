'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ApplyFormList from '@/features/apply/components/ApplyFormList';
import { APPLY_FORM_STYLE } from '@/features/apply/constants/styles';
import {
  useApplyMutation,
  useResumeMutation,
} from '@/features/apply/queries/mutations';
import {
  CreateApplicationRequest,
  createApplicationRequestSchema,
  uploadResumeResponseSchema,
} from '@/features/apply/schema/apply.schema';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import { usePopupStore } from '@/shared/store/popupStore';

const ApplyForm = ({ formId }: { formId: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { showPopup } = usePopupStore();

  const methods = useForm({
    resolver: zodResolver(createApplicationRequestSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
      experienceMonths: undefined,
      resumeId: 0,
      resumeName: '',
      introduction: '',
      password: '',
    },
  });

  //로컬 스토리지에서 임시저장 데이터 불러오기
  useEffect(() => {
    const draft = localStorage.getItem('apply-draft');
    if (draft) {
      const parsed = JSON.parse(draft);
      const { realResumeName, ...formValues } = parsed;
      Object.entries(formValues).forEach(([key, value]) => {
        methods.setValue(
          key as keyof CreateApplicationRequest,
          value as CreateApplicationRequest[keyof CreateApplicationRequest],
          { shouldDirty: true, shouldValidate: true }
        );
      });
      setUploadedFileName(realResumeName);
      showPopup('임시 저장한 데이터를 가져왔습니다', 'success');
    }
  }, [methods, showPopup]);

  const { mutateAsync: resumeMutate, isPending: isResumePending } =
    useResumeMutation();
  const { mutate: applyMutate, isPending: isApplyPending } = useApplyMutation();

  const handleFileChange = (file?: File) => {
    if (file) {
      setSelectedFile(file);
    } else {
      setUploadedFileName(null);
    }
  };

  const handleSave = async () => {
    let resume;
    try {
      if (selectedFile) {
        resume = await resumeMutate(selectedFile);
      }
      const values = methods.getValues();
      const draft = {
        ...values,
        ...resume?.data,
        realResumeName: selectedFile?.name,
      };
      if (resume) {
        methods.setValue('resumeId', resume.data.resumeId);
        methods.setValue('resumeName', resume.data.resumeName);
      }
      localStorage.setItem('apply-draft', JSON.stringify(draft));
      showPopup('알바폼이 임시 저장되었습니다.', 'success');
    } catch (error) {
      console.error('임시 저장 중 오류 발생:', error);
      showPopup('임시 저장 중 오류가 발생했습니다.', 'error');
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        const resume = await resumeMutate(selectedFile);
        const parseResponse = uploadResumeResponseSchema.safeParse(resume.data);
        if (!parseResponse.success) {
          console.error(
            '서버 응답 데이터 Zod 유효성 검사 실패',
            parseResponse.error
          );
          return;
        }
        methods.setValue('resumeId', resume.data.resumeId);
        methods.setValue('resumeName', resume.data.resumeName);
      } catch (error) {
        console.error('파일 업로드 중 오류 발생:', error);
        showPopup('파일 업로드 중 오류가 발생했습니다.', 'error');
      }
    }
    try {
      applyMutate({ formId: Number(formId), form: methods.getValues() });
      localStorage.removeItem('apply-draft');
      showPopup('지원이 완료되었습니다.', 'success');
    } catch (error) {
      console.error('제출 중 오류 발생:', error);
      showPopup('지원 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        <ApplyFormList
          uploadedFileName={uploadedFileName}
          onFileChange={handleFileChange}
        />
        <div className="flex flex-col gap-10 py-10 lg:mt-48 lg:flex-row lg:gap-8 lg:py-0">
          <PrimaryButton
            className={APPLY_FORM_STYLE.button}
            disabled={isResumePending || isApplyPending}
            label="임시 저장"
            type="button"
            variant="outline"
            onClick={handleSave}
          />
          <PrimaryButton
            className={APPLY_FORM_STYLE.button}
            disabled={
              !methods.formState.isValid ||
              (!selectedFile && !uploadedFileName) ||
              isResumePending ||
              isApplyPending
            }
            label={isResumePending || isApplyPending ? '제출 중' : '작성 완료'}
            type="button"
            variant="solid"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ApplyForm;
