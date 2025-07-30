'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ApplyFormList from '@/features/apply/components/ApplyFormList';
import { APPLY_FORM_STYLE } from '@/features/apply/constants/styles';
import {
  useApplyMutation,
  useResumeMutation,
} from '@/features/apply/queries/mutations';
import { createApplicationRequestSchema } from '@/features/apply/schema/apply.schema';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

const ApplyForm = ({ formId }: { formId: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const methods = useForm({
    resolver: zodResolver(createApplicationRequestSchema),
    mode: 'onChange',
    defaultValues: { resumeId: 0, resumeName: '' },
  });

  const { mutateAsync: resumeMutate, isPending: isResumePending } =
    useResumeMutation();
  const { mutate: applyMutate, isPending: isApplyPending } = useApplyMutation();

  const handleFileChange = (file?: File) => {
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const resume = await resumeMutate(selectedFile);
      methods.setValue('resumeId', resume.data.resumeId);
      methods.setValue('resumeName', resume.data.resumeName);
      applyMutate({ formId: Number(formId), form: methods.getValues() });
    }
  };

  return (
    <FormProvider {...methods}>
      <form>
        <ApplyFormList onFileChange={handleFileChange} />
        <div className="flex flex-col gap-10 py-10 lg:mt-48 lg:flex-row lg:gap-8 lg:py-0">
          <PrimaryButton
            className={APPLY_FORM_STYLE.button}
            disabled={isResumePending || isApplyPending}
            label="임시 저장"
            type="button"
            variant="outline"
          />
          <PrimaryButton
            className={APPLY_FORM_STYLE.button}
            disabled={
              !methods.formState.isValid ||
              !selectedFile ||
              isResumePending ||
              isApplyPending
            }
            label="작성 완료"
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
