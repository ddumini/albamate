'use client';

import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import Textarea from '@/shared/components/common/input/Textarea';
import UploadSingleImage from '@/shared/components/common/uploadImage/UploadSingleImage';

import { CreateAlbatalkParams } from '../../schemas/albatalk.schema';

interface AddtalkFormProps {
  form: UseFormReturn<CreateAlbatalkParams>;
  onImageFileChange?: (file: File | null) => void;
}

const AddtalkForm = ({ form, onImageFileChange }: AddtalkFormProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const watchedImageUrl = watch('imageUrl');

  useEffect(() => {
    const normalizedUrl = watchedImageUrl ?? null;
    if (normalizedUrl !== imageUrl) {
      setImageUrl(normalizedUrl);
    }
  }, [watchedImageUrl, imageUrl]);

  const handleImageChange = async (file: File) => {
    if (imageUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }

    // 새로운 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setSelectedFile(file);

    onImageFileChange?.(file);

    // 폼에는 임시로 미리보기 URL 저장 (나중에 실제 URL로 교체됨)
    setValue('imageUrl', previewUrl);
  };

  // 컴포넌트 언마운트 시 blob URL 정리
  useEffect(() => {
    return () => {
      if (imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="flex flex-col gap-24 py-16 md:px-24 lg:gap-40 lg:py-48">
      {/* 제목 입력 */}
      <section className="flex flex-col gap-16">
        <Label isRequired htmlFor="title">
          제목
        </Label>
        <Input
          id="title"
          placeholder="제목을 입력해주세요."
          {...register('title')}
          isInvalid={!!errors.title}
        />
        <ErrorMessage
          isVisible={!!errors.title}
          message={errors.title?.message}
        />
      </section>

      {/* 내용 입력 */}
      <section className="flex flex-col gap-16">
        <Label isRequired htmlFor="content">
          내용
        </Label>
        <Textarea
          className="h-180 md:h-200 lg:h-240"
          id="content"
          isInvalid={!!errors.content}
          placeholder="내용을 입력해주세요."
          {...register('content')}
        />
        <ErrorMessage
          isVisible={!!errors.content}
          message={errors.content?.message}
        />
      </section>

      {/* 이미지 업로드 */}
      <section className="flex flex-col gap-16">
        <Label htmlFor="imageUrl">이미지</Label>
        <UploadSingleImage
          id="imageUrl"
          initialImageUrl={imageUrl}
          onImageChange={handleImageChange}
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-500">{errors.imageUrl.message}</p>
        )}
      </section>
    </div>
  );
};
export default AddtalkForm;
