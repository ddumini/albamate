'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { APPLY_FORM_STYLE } from '@/features/apply/constants/styles';
import { CreateApplicationRequest } from '@/features/apply/schema/apply.schema';
import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import InputFile from '@/shared/components/common/input/InputFile';
import Label from '@/shared/components/common/input/Label';
import Textarea from '@/shared/components/common/input/Textarea';
import { cn } from '@/shared/lib/cn';

const ApplyFormList = ({
  onFileChange,
}: {
  onFileChange: (file?: File) => void;
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const isFileSelected = selectedFileName !== '';
  const itemStyle = APPLY_FORM_STYLE.listItem;

  const {
    register,
    formState: { errors },
  } = useFormContext<CreateApplicationRequest>();

  const handleFileChange = (files: File[]) => {
    const file = files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
    onFileChange(file);
  };

  const handleFileDelete = () => {
    setSelectedFileName('');
    onFileChange(undefined);
  };

  return (
    <ul className="flex flex-col gap-32 py-32">
      <li className={itemStyle}>
        <Label isRequired htmlFor="name">
          이름
        </Label>
        <Input
          {...register('name')}
          id="name"
          isInvalid={!!errors.name}
          placeholder="이름을 입력해주세요."
          type="text"
          variant="solid"
        />
        <ErrorMessage
          isVisible={!!errors.name}
          message={errors.name?.message}
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="phone">
          연락처
        </Label>
        <Input
          {...register('phoneNumber')}
          id="phone"
          isInvalid={!!errors.phoneNumber}
          placeholder="숫자만 입력해주세요."
          type="tel"
          variant="solid"
        />
        <ErrorMessage
          isVisible={!!errors.phoneNumber}
          message={errors.phoneNumber?.message}
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="career">
          경력(개월 수)
        </Label>
        <Input
          {...register('experienceMonths', { valueAsNumber: true })}
          id="career"
          min={0}
          placeholder="숫자만 입력해주세요."
          step={1}
          type="number"
          variant="solid"
        />
        <ErrorMessage
          isVisible={!!errors.experienceMonths}
          message={errors.experienceMonths?.message}
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="resume">
          이력서
        </Label>
        <div className="relative">
          <IconInput
            readOnly
            alt={isFileSelected ? '삭제' : '업로드'}
            iconClassName="dark:invert-60"
            iconOnClick={isFileSelected ? handleFileDelete : undefined}
            inputClassName="text-left"
            placeholder="파일 업로드하기"
            position="right"
            src={isFileSelected ? '/icons/x-circle.svg' : '/icons/upload.svg'}
            value={selectedFileName || ''}
          />
          <InputFile
            accept=".pdf,.docx,.doc"
            className={cn(
              'absolute inset-0 cursor-pointer overflow-hidden',
              isFileSelected && 'right-52 lg:right-64'
            )}
            id="resume"
            maxFileSizeMb={5}
            validFileTypes={[
              'application/pdf',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword',
            ]}
            onChange={handleFileChange}
          />
        </div>
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="introduction">
          자기소개
        </Label>
        <Textarea
          {...register('introduction')}
          id="introduction"
          isInvalid={!!errors.introduction}
          maxLength={200}
          placeholder="최대 200자까지 입력 가능합니다."
          variant="solid"
        />
        <ErrorMessage
          isVisible={!!errors.introduction}
          message={errors.introduction?.message}
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="password">
          비밀번호
        </Label>
        <Input
          {...register('password')}
          id="password"
          isInvalid={!!errors.password}
          placeholder="비밀번호를 입력해주세요."
          type="password"
          variant="solid"
        />
        <span className="px-8 text-xs leading-none text-gray-400 lg:text-2lg">
          *지원내역 확인에 사용됩니다.
        </span>
        <ErrorMessage
          isVisible={!!errors.password}
          message={errors.password?.message}
        />
      </li>
    </ul>
  );
};

export default ApplyFormList;
