import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import AddressSearchModal from '@/shared/components/common/input/AddressSearchModal';
import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import ProfileEdit from '@/shared/components/common/profile/ProfileEdit';

import { FormField } from '../constants/formFields';

interface AuthFormItemProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  field?: FormField; // field 정보 추가
}

const AuthFormItem = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
  setValue,
  watch,
  field,
}: AuthFormItemProps<T>) => {
  const fieldError = errors?.[name];
  const hasError = !!fieldError;
  const isRequired = field?.required ?? false;

  // 이미지 타입인 경우 ProfileEdit 컴포넌트 렌더링
  if (type === 'image') {
    const currentImageUrl = watch?.(name);

    return (
      <div>
        <Label className="sr-only" htmlFor={name} isRequired={isRequired}>
          {label}
        </Label>
        <div className="mt-8 flex justify-center lg:mt-16">
          <ProfileEdit
            id={name}
            imageUrl={currentImageUrl}
            onError={errorMessage => {
              // 에러 메시지를 폼 에러로 설정
              if (setValue) {
                setValue(name, '' as any);
                setValue(`${name}Error` as Path<T>, errorMessage as any);
              }
            }}
            onImageChange={file => {
              // 파일명을 폼에 저장
              setValue?.(name, file.name as any);
            }}
          />
          <ErrorMessage
            isVisible={hasError}
            message={fieldError?.message as string}
          />
        </div>
      </div>
    );
  }

  // 주소 타입인 경우 AddressSearchModal 컴포넌트 렌더링
  if (type === 'address') {
    const currentAddress = watch?.(name);

    return (
      <div>
        <Label htmlFor={name} isRequired={isRequired}>
          {label}
        </Label>
        <div className="mt-8 lg:mt-16">
          <AddressSearchModal
            currentAddress={currentAddress as string}
            onAddressSelect={address => {
              setValue?.(name, address as any);
            }}
          >
            <IconInput
              readOnly
              alt="주소 검색"
              className="w-full"
              iconClassName="cursor-pointer"
              inputClassName="cursor-pointer"
              placeholder={field?.placeholder || '주소를 검색해주세요'}
              src="/icons/pin-solid.svg"
              value={currentAddress}
            />
          </AddressSearchModal>
          <ErrorMessage
            isVisible={hasError}
            message={fieldError?.message as string}
          />
        </div>
      </div>
    );
  }

  // 일반 입력 필드 렌더링
  return (
    <div>
      <Label htmlFor={name} isRequired={isRequired}>
        {label}
      </Label>
      <div className="mt-8 lg:mt-16">
        <Input
          id={name}
          isInvalid={hasError}
          type={type}
          variant="outlined"
          {...register(name)}
        />
        <ErrorMessage
          isVisible={hasError}
          message={fieldError?.message as string}
        />
      </div>
    </div>
  );
};

export default AuthFormItem;
