'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { CreateFormRequest } from '@/features/addform/schema/addform.schema';
import Checkbox from '@/shared/components/common/button/Checkbox';
import DatePicker from '@/shared/components/common/date-picker';
import AddressSearchModal from '@/shared/components/common/input/AddressSearchModal';
import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import TimePicker from '@/shared/components/common/time-picker';
import WeekPicker from '@/shared/components/common/week-picker';
import { cn } from '@/shared/lib/cn';

import AddFormSection from './AddFormSection';

const WorkConditionForm = ({ className }: { className?: string }) => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateFormRequest>();

  return (
    <div
      className={cn(
        'flex flex-col gap-32 px-24 py-32 lg:gap-52 lg:py-48',
        className
      )}
    >
      <AddFormSection>
        <Label isRequired htmlFor="location">
          근무 위치
        </Label>
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <AddressSearchModal
              currentAddress={field.value}
              onAddressSelect={address => {
                field.onChange(address);
              }}
            >
              <IconInput
                readOnly
                alt="주소 검색"
                className="w-full"
                iconClassName="cursor-pointer"
                inputClassName="cursor-pointer"
                isInvalid={!!errors.location}
                placeholder="주소를 검색해주세요"
                src="/icons/pin-solid.svg"
                value={field.value ?? ''}
              />
            </AddressSearchModal>
          )}
        />
        <ErrorMessage
          isVisible={!!errors.location}
          message={errors.location?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 기간</Label>
        <Controller
          control={control}
          name="workStartDate"
          render={({ field }) => {
            const workEndDate = watch('workEndDate');
            const selectedRange = {
              from: field.value ? new Date(field.value) : undefined,
              to: workEndDate ? new Date(workEndDate) : undefined,
            };
            return (
              <DatePicker
                isInvalid={!!errors.workStartDate}
                value={selectedRange}
                onDateRangeChange={range => {
                  field.onChange(range?.from ? range.from.toISOString() : '');
                  setValue(
                    'workEndDate',
                    range?.to ? range.to.toISOString() : '',
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  );
                }}
              />
            );
          }}
        />
        <ErrorMessage
          isVisible={!!errors.workStartDate}
          message={errors.workStartDate?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 시간</Label>
        <Controller
          control={control}
          name="workStartTime"
          render={({ field }) => {
            const workEndTime = watch('workEndTime');
            const timeRange = {
              workStartTime: field.value,
              workEndTime: workEndTime,
            };
            return (
              <TimePicker
                isEndInvalid={!!errors.workEndTime}
                isStartInvalid={!!errors.workStartTime}
                value={timeRange}
                onChange={range => {
                  field.onChange(range.workStartTime);
                  setValue('workEndTime', range.workEndTime as any, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
            );
          }}
        />
        <ErrorMessage
          isVisible={!!errors.workStartTime || !!errors.workEndTime}
          message={errors.workStartTime?.message || errors.workEndTime?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 요일</Label>
        <Controller
          control={control}
          name="workDays"
          render={({ field }) => (
            <WeekPicker
              isInValid={!!errors.workDays}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <ErrorMessage
          isVisible={!!errors.workDays}
          message={errors.workDays?.message}
        />
        <div className="px-10 py-8 lg:px-14 lg:py-16">
          <Controller
            control={control}
            name="isNegotiableWorkDays"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                id="isNegotiableWorkDays"
                label="요일 협의 가능"
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="hourlyWage">
          시급
        </Label>
        <div className="relative">
          <Input
            className="pr-46 pl-24 lg:pr-60 lg:pl-32"
            id="hourlyWage"
            isInvalid={!!errors.hourlyWage}
            placeholder={`${process.env.NEXT_PUBLIC_MINIMUM_WAGE}`}
            {...register('hourlyWage', {
              setValueAs: value =>
                value === '' || value === undefined ? undefined : Number(value),
            })}
          />
          <span className="absolute top-14 right-30 text-lg font-medium text-black-400 lg:top-16 lg:right-40 lg:text-xl dark:text-gray-100">
            원
          </span>
        </div>
        <ErrorMessage
          isVisible={!!errors.hourlyWage}
          message={errors.hourlyWage?.message}
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="isPublic">
          공개 설정
        </Label>
        <div className="px-10 py-8 lg:px-14 lg:py-16">
          <Controller
            control={control}
            name="isPublic"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                id="isPublic"
                label="공개"
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </AddFormSection>
    </div>
  );
};
export default WorkConditionForm;
