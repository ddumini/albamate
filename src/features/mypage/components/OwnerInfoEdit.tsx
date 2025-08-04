import PrimaryButton from '@common/button/PrimaryButton';
import IconInput from '@common/input/IconInput';
import Input from '@common/input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';
import { usePopupStore } from '@/shared/store/popupStore';
import { FormData } from '@/shared/types/mypage';

import useMyPageApi from '../api/api';
import { useUpdateMyProfileQuery } from '../queries';
import {
  createOwnerSchema,
  UpdateOwnerMyProfile,
} from '../schema/mypage.schema';
import MyPageAddressSearchModal from './MyPageAddressSearchModal';

interface OwnerInfoEditProps {
  userInfo: FormData;
  close: () => void;
}

const OwnerInfoEdit = ({ userInfo, close }: OwnerInfoEditProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    userInfo?.imageUrl ?? '/icons/user-profile.svg'
  );
  const [imageFile, setImageFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof createOwnerSchema>>({
    resolver: zodResolver(createOwnerSchema),
    defaultValues: {
      nickname: userInfo?.nickname ?? '',
      storeName:
        userInfo?.storeName && userInfo.storeName !== 'undefined'
          ? userInfo.storeName
          : '',
      storePhoneNumber:
        userInfo?.storePhoneNumber && userInfo.storePhoneNumber !== 'undefined'
          ? userInfo.storePhoneNumber
          : '',
      phoneNumber: userInfo.phoneNumber ?? '',
      location:
        userInfo.location === 'undefined' || userInfo.location == null
          ? ''
          : userInfo.location,
    },
  });

  const updateProfile = useUpdateMyProfileQuery();
  const api = useMyPageApi();
  const { showPopup } = usePopupStore();

  const handleImageChange = async (file: File) => {
    setImageFile(file);
  };

  const onSubmit = async (data: UpdateOwnerMyProfile) => {
    let finalImageUrl = imageUrl ?? null;
    try {
      if (imageFile) {
        const response = await api.updateImage(imageFile);
        finalImageUrl = response.url;
      }
    } catch (error) {
      showPopup('이미지 업로드에 실패했습니다. 다시 시도해주세요.', 'error');
      console.error(error);
    }
    updateProfile.mutate(
      { ...data, imageUrl: finalImageUrl },
      {
        onSuccess: () => {
          showPopup('프로필이 성공적으로 수정되었습니다.', 'success');
          close();
        },
        onError: error => {
          showPopup('수정 중 오류가 발생했습니다', 'error');
          console.error(error);
        },
      }
    );
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-53 flex w-full justify-center">
        <ProfileEdit imageUrl={imageUrl} onImageChange={handleImageChange} />
      </div>
      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="nickname">
          닉네임 <span className="text-mint-100">*</span>
        </label>
        <Input
          placeholder="닉네임을 입력해주세요."
          variant="outlined"
          {...register('nickname')}
          isInvalid={!!errors.nickname}
        />
        {errors.nickname && (
          <p className="text-sm text-red-500">{errors.nickname.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="storeName">
          가게 이름 <span className="text-mint-100">*</span>
        </label>
        <Input
          id="storeName"
          placeholder="이름을 입력해주세요."
          variant="outlined"
          {...register('storeName')}
          isInvalid={!!errors.storeName}
        />
        {errors.storeName && (
          <p className="text-sm text-red-500">{errors.storeName.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="storePhone">
          가게 전화번호 <span className="text-mint-100">*</span>
        </label>
        <Input
          placeholder="숫자만 입력해주세요."
          variant="outlined"
          {...register('storePhoneNumber')}
          isInvalid={!!errors.storePhoneNumber}
        />
        {errors.storePhoneNumber && (
          <p className="text-sm text-red-500">
            {errors.storePhoneNumber.message}
          </p>
        )}
      </div>

      <div className="mb-16">
        <label className="mb-8 text-md" htmlFor="ownerPhone">
          사장님 전화번호
        </label>
        <Input
          placeholder="숫자만 입력해주세요."
          variant="outlined"
          {...register('phoneNumber')}
          isInvalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="location">
          가게 위치 <span className="text-mint-100">*</span>
        </label>
        <MyPageAddressSearchModal
          currentAddress={watch('location') || ''}
          onAddressSelect={(address: string) => {
            setValue('location', address);
          }}
        >
          <IconInput
            readOnly
            alt="위치"
            id="location"
            isInvalid={!!errors.location}
            placeholder="위치를 입력해주세요."
            position="left"
            src="/icons/pin-solid.svg"
            value={watch('location') || ''}
            variant="outlined"
            {...register('location')}
          />
        </MyPageAddressSearchModal>
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div className="flex gap-11">
        <PrimaryButton
          className="w-158 flex-1 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          label="취소"
          type="button"
          variant="cancelSolid"
          onClick={() => close()}
        />
        <PrimaryButton
          className="w-158 flex-1 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          label="수정하기"
          type="submit"
          variant="solid"
        />
      </div>
    </form>
  );
};

export default OwnerInfoEdit;
