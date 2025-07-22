import PrimaryButton from '@common/button/PrimaryButton';
import Input from '@common/input/Input';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  nickname: string;
  phone: string;
}

interface WorkerInfoEditProps {
  close: () => void;
}

const WorkerInfoEdit = ({ close }: WorkerInfoEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.error(data);
    close();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-16 h-112 lg:mb-20">
        <label className="mb-8 text-md" htmlFor="name">
          이름 <span className="text-mint-100">*</span>
        </label>
        <Input
          id="name"
          placeholder="이름을 입력해주세요."
          variant="outlined"
          {...register('name', { required: '이름은 필수입니다.' })}
          isInvalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-16 h-112 lg:mb-20">
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

      <div className="mb-24 h-112 lg:mb-20">
        <label className="mb-8 text-md" htmlFor="phone">
          연락처 <span className="text-mint-100">*</span>
        </label>
        <Input
          placeholder="숫자만 입력해주세요."
          variant="outlined"
          {...register('phone', {
            required: '연락처는 필수입니다.',
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요.',
            },
          })}
          isInvalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
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

export default WorkerInfoEdit;
