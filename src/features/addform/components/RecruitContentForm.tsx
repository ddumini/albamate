'use client';

import DatePicker from '@/shared/components/common/date-picker';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import Textarea from '@/shared/components/common/input/Textarea';
import UploadMultipleImage from '@/shared/components/common/uploadImage/UploadMultipleImage';
import { cn } from '@/shared/lib/cn';

import AddFormSection from './AddFormSection';

const RecruitContentForm = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-32 px-24 py-32 lg:gap-52 lg:py-48',
        className
      )}
    >
      <AddFormSection>
        <Label isRequired htmlFor="title">
          알바폼 제목
        </Label>
        <Input required id="title" placeholder="제목을 입력해주세요." />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="description">
          소개글
        </Label>
        <Textarea
          required
          id="description"
          maxLength={200}
          placeholder="최대 200자까지 입력 가능합니다."
        />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>모집 기간</Label>
        <DatePicker />
      </AddFormSection>
      <AddFormSection>
        <Label>이미지 첨부</Label>
        <UploadMultipleImage onImageChange={() => {}} />
      </AddFormSection>
    </div>
  );
};
export default RecruitContentForm;
