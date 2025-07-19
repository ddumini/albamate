'use client';

import { useState } from 'react';

import Checkbox from '@/shared/components/common/button/Checkbox';
import DatePicker from '@/shared/components/common/date-picker';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import TimePicker from '@/shared/components/common/time-picker';
import WeekPicker from '@/shared/components/common/week-picker';
import { cn } from '@/shared/lib/cn';

import AddFormSection from './AddFormSection';

const WorkConditionForm = ({ className }: { className?: string }) => {
  const [isNegotiableWorkDays, setIsNegotiableWorkDays] =
    useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
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
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 기간</Label>
        <DatePicker />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 시간</Label>
        <TimePicker />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>근무 요일</Label>
        <WeekPicker />
        <div className="px-10 py-8 lg:px-14 lg:py-16">
          <Checkbox
            checked={isNegotiableWorkDays}
            id="isNegotiableWorkDays"
            label="요일 협의 가능"
            onChange={setIsNegotiableWorkDays}
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
          />
          <span className="absolute top-14 right-30 text-lg font-medium text-black-400 lg:top-16 lg:right-40 lg:text-xl">
            원
          </span>
        </div>
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="isPublic">
          공개 설정
        </Label>
        <div className="px-10 py-8 lg:px-14 lg:py-16">
          <Checkbox
            checked={isPublic}
            id="isPublic"
            label="공개"
            onChange={setIsPublic}
          />
        </div>
      </AddFormSection>
    </div>
  );
};
export default WorkConditionForm;
