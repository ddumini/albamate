import PrimaryButton from '@common/button/PrimaryButton';
import IconInput from '@common/input/IconInput';
import Input from '@common/input/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUploadImage } from '@/features/common/api';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

import { FormData } from '../../../shared/types/mypage';
import { useUpdateMyProfileQuery } from '../queries';

interface OwnerInfoEditProps {
  userInfo: FormData;
  close: () => void;
}

const OwnerInfoEdit = ({ userInfo, close }: OwnerInfoEditProps) => {
  const [imageUrl, setImageUrl] = useState(userInfo?.imageUrl);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nickname: userInfo?.nickname,
      storeName: userInfo.storeName === 'undefined' ? '' : userInfo.storeName,
      storePhoneNumber:
        userInfo.storePhoneNumber === 'undefined'
          ? ''
          : userInfo.storePhoneNumber,
      phoneNumber: userInfo?.phoneNumber,
      location: userInfo.location === 'undefined' ? '' : userInfo.location,
    },
  });

  const updateProfile = useUpdateMyProfileQuery();
  const api = useUploadImage();

  const handleImageChange = async (file: File) => {
    try {
      const response = await api.getImageUrl(file);
      const uploadUrl = response.url;
      setImageUrl(uploadUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: FormData) => {
    updateProfile.mutate(
      { ...data, imageUrl },
      {
        onSuccess: () => {
          alert('프로필이 성공적으로 수정되었습니다.');
          close();
        },
        onError: error => {
          alert('수정 중 오류가 발생했습니다');
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
          {...register('nickname', { required: '닉네임은 필수입니다.' })}
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
          {...register('storeName', { required: '가게 이름은 필수입니다.' })}
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
          {...register('storePhoneNumber', {
            required: '연락처는 필수입니다.',
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요.',
            },
          })}
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
          {...register('phoneNumber', {
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요.',
            },
          })}
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
        <IconInput
          alt="위치"
          id="location"
          placeholder="위치를 입력해주세요."
          position="left"
          src="/icons/pin-solid.svg"
          variant="outlined"
          {...register('location', { required: '가게 위치는 필수입니다.' })}
          isInvalid={!!errors.location}
        />
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
