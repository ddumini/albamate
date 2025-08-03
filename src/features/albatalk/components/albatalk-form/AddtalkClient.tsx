'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useImageMutation } from '@/features/addform/queries/mutations';
import LoadingSpinner from '@/shared/components/ui/LoadingSpinner';
import { usePopupStore } from '@/shared/store/popupStore';

import {
  useAlbatalkDetail,
  useCreateAlbatalk,
  useUpdateAlbatalk,
} from '../../hooks/useAlbatalk';
import {
  CreateAlbatalkParams,
  CreateAlbatalkParamsSchema,
} from '../../schemas/albatalk.schema';
import AddtalkButtons from './AddtalkButtons';
import AddtalkForm from './AddtalkForm';

interface AddtalkClientProps {
  albatalkId?: string;
}

const AddtalkClient = ({ albatalkId }: AddtalkClientProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { showPopup } = usePopupStore();

  const isEditMode = !!albatalkId;
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // 이미지 파일 변경 핸들러
  const handleImageFileChange = (file: File | null) => {
    setSelectedImageFile(file);
  };

  const numericAlbatalkId = albatalkId ? Number(albatalkId) : 0;

  const form = useForm<CreateAlbatalkParams>({
    resolver: zodResolver(CreateAlbatalkParamsSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: null,
    },
  });

  const {
    data: initialData,
    isLoading,
    error,
  } = useAlbatalkDetail(numericAlbatalkId, {
    enabled: isEditMode && numericAlbatalkId > 0,
  });

  // 뮤테이션
  const createMutation = useCreateAlbatalk();
  const updateMutation = useUpdateAlbatalk();
  const imageMutation = useImageMutation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  // 초기 데이터 설정
  useEffect(() => {
    if (isEditMode && initialData) {
      form.setValue('title', initialData.title);
      form.setValue('content', initialData.content);
      form.setValue('imageUrl', initialData.imageUrl);
    }
  }, [isEditMode, initialData, form]);

  const handleSubmit = async (data: CreateAlbatalkParams) => {
    try {
      let finalImageUrl: string | null = data.imageUrl ?? null;

      // 1. 새로운 이미지가 선택되었는지 확인하고, 이미지 업로드 뮤테이션 실행
      if (selectedImageFile) {
        const imageUploadResponse =
          await imageMutation.mutateAsync(selectedImageFile);
        finalImageUrl = imageUploadResponse.data.url; // 서버가 반환한 실제 URL
      } else if (isEditMode && initialData?.imageUrl && !data.imageUrl) {
        // 수정 모드에서 기존 이미지를 삭제한 경우 (imageUrl이 null이 됨)
        finalImageUrl = null;
      }

      // 2. 최종 이미지 URL로 폼 데이터 업데이트
      const finalData = {
        ...data,
        imageUrl: finalImageUrl,
      };

      // 3. 게시글 생성 또는 수정 뮤테이션 실행
      if (isEditMode && numericAlbatalkId) {
        await updateMutation.mutateAsync({
          postId: numericAlbatalkId,
          ...finalData, // 최종 데이터 사용
        });
        showPopup('알바토크가 성공적으로 수정되었습니다!', 'success');
      } else {
        await createMutation.mutateAsync(finalData); // 최종 데이터 사용
        showPopup('알바토크가 성공적으로 등록되었습니다!', 'success');
      }

      router.push('/albatalk');
    } catch (error) {
      console.error('폼 제출 오류: ', error);
      const errorMessage = isEditMode
        ? '수정 중 오류가 발생했습니다.'
        : '등록 중 오류가 발생했습니다.';
      console.error(errorMessage);
    }
  };

  // 제출 버튼 클릭 시 폼 제출 트리거
  const handleSubmitButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // 로딩상태
  if (isEditMode && isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  // 에러 상태
  if (isEditMode && error) {
    return (
      <div className="flex flex-col gap-16 px-24 py-16 md:px-72 md:py-24 lg:gap-24 lg:px-220 lg:py-40">
        <div className="py-12 text-center">
          <div className="mb-4 text-xl text-red-500">⚠️</div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            오류가 발생했습니다
          </h2>
          <p className="mb-4 text-gray-600">
            알바토크 데이터를 불러올 수 없습니다.
          </p>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            type="button"
            onClick={() => router.back()}
          >
            뒤로가기
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-16 px-24 py-16 md:px-72 md:py-24 lg:gap-24 lg:px-220 lg:py-40">
      <header className="flex items-center justify-between border-b border-line-200 py-16 md:px-24 lg:py-34">
        <h1 className="text-2lg font-semibold text-black-400 md:text-xl lg:text-3xl dark:text-gray-100">
          {isEditMode ? '글 수정하기' : '글쓰기'}
        </h1>
        {/* 데스크탑용 버튼 */}
        <AddtalkButtons
          className="hidden md:flex"
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmitButtonClick}
        />
      </header>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
        <AddtalkForm form={form} onImageFileChange={handleImageFileChange} />
      </form>
      {/* 모바일용 버튼 */}
      <AddtalkButtons
        className="md:hidden"
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitButtonClick}
      />
    </div>
  );
};

export default AddtalkClient;
