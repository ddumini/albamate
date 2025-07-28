'use client';

import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Checkbox from '@/shared/components/common/button/Checkbox';
import DatePicker from '@/shared/components/common/date-picker';
import ErrorMessage from '@/shared/components/common/input/ErrorMessage';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import TimePicker from '@/shared/components/common/time-picker';
import WeekPicker from '@/shared/components/common/week-picker';
import { cn } from '@/shared/lib/cn';

import { CreateFormRequest } from '../schema/addform.schema';
import AddFormSection from './AddFormSection';

const WorkConditionForm = ({ className }: { className?: string }) => {
  const [isNegotiableWorkDays, setIsNegotiableWorkDays] =
    useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
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
        <IconInput
          alt="근무 위치"
          id="location"
          placeholder="위치를 입력해주세요."
          src="/icons/pin-stroke.svg"
          {...register('location')}
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
                defaultValue={selectedRange}
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
                defaultValue={timeRange}
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
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 요일</Label>
        <Controller
          control={control}
          name="workDays"
          render={({ field }) => (
            <WeekPicker defaultValue={field.value} onChange={field.onChange} />
          )}
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
            placeholder="10030"
            {...register('hourlyWage', { valueAsNumber: true })}
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
