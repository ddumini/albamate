import { Controller, useFormContext } from 'react-hook-form';

import { CreateFormRequest } from '@/features/addform/schema/addform.schema';
import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import Label from '@/shared/components/common/input/Label';
import InputDropdown from '@/shared/components/common/input-dropdown';
import { cn } from '@/shared/lib/cn';

import AddFormSection from './AddFormSection';

const RecruitConditionForm = ({ className }: { className?: string }) => {
  const numberOfPositionsOptions = [
    { value: '00명 (인원미정)' },
    { value: '1명' },
    { value: '2명' },
    { value: '3명' },
    { value: '4명' },
  ];
  const genderOptions = [
    { value: '성별무관' },
    { value: '남성' },
    { value: '여성' },
  ];
  const educationOptions = [
    { value: '학력무관' },
    { value: '중졸 이하' },
    { value: '고교 재학 중' },
    { value: '고교 졸업' },
    { value: '대학 재학 중' },
    { value: '대학 졸업 이상' },
  ];
  const ageOptions = [
    { value: '연령무관' },
    { value: '18세 미만' },
    { value: '18~22세' },
    { value: '23~29세' },
    { value: '30~39세' },
    { value: '40세 이상' },
  ];
  const preferredOptions = [{ value: '없음' }];

  const {
    control,
    formState: { errors },
  } = useFormContext<CreateFormRequest>();
  return (
    <div
      className={cn(
        'flex flex-col gap-32 px-24 py-32 lg:gap-52 lg:py-48',
        className
      )}
    >
      <AddFormSection>
        <Label isRequired htmlFor="numberOfPositions">
          모집인원
        </Label>
        <Controller
          control={control}
          name="numberOfPositions"
          render={({ field }) => (
            <InputDropdown
              defaultValue={field.value ? String(field.value) : undefined}
              name="numberOfPositions"
              options={numberOfPositionsOptions}
              onChange={value => {
                field.onChange(parseInt(value));
              }}
            />
          )}
        />
        <ErrorMessage
          isVisible={!!errors.numberOfPositions}
          message={errors.numberOfPositions?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="gender">
          성별
        </Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <InputDropdown
              defaultValue={field.value ? String(field.value) : undefined}
              name="gender"
              options={genderOptions}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          isVisible={!!errors.gender}
          message={errors.gender?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="education">
          학력
        </Label>
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <InputDropdown
              defaultValue={field.value ? String(field.value) : undefined}
              name="education"
              options={educationOptions}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          isVisible={!!errors.education}
          message={errors.education?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="age">
          연령
        </Label>
        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <InputDropdown
              defaultValue={field.value ? String(field.value) : undefined}
              name="age"
              options={ageOptions}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage isVisible={!!errors.age} message={errors.age?.message} />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="preferred">
          우대사항
        </Label>
        <Controller
          control={control}
          name="preferred"
          render={({ field }) => (
            <InputDropdown
              defaultValue={field.value ? String(field.value) : undefined}
              name="preferred"
              options={preferredOptions}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          isVisible={!!errors.preferred}
          message={errors.preferred?.message}
        />
      </AddFormSection>
    </div>
  );
};
export default RecruitConditionForm;
