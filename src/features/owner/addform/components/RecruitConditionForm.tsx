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
  return (
    <div
      className={cn(
        'flex flex-col gap-32 px-24 py-32 lg:gap-52 lg:py-48',
        className
      )}
    >
      <AddFormSection>
        <Label isRequired>모집인원</Label>
        <InputDropdown options={numberOfPositionsOptions} />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>성별</Label>
        <InputDropdown options={genderOptions} />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>학력</Label>
        <InputDropdown options={educationOptions} />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired>연령</Label>
        <InputDropdown options={ageOptions} />
      </AddFormSection>
      <AddFormSection>
        <Label isRequired htmlFor="preferred">
          우대사항
        </Label>
        <InputDropdown options={preferredOptions} />
      </AddFormSection>
    </div>
  );
};
export default RecruitConditionForm;
