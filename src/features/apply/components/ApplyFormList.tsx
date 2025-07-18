'use client';

import { useRef, useState } from 'react';

import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import Textarea from '@/shared/components/common/input/Textarea';

import { APPLY_FORM_STYLE } from '../constants/styles';

const ApplyFormList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const isFileSelected = selectedFileName !== '';
  const itemStyle = APPLY_FORM_STYLE.listItem;
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleFileDelete = () => {
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <ul className="flex flex-col gap-32 py-32">
      <li className={itemStyle}>
        <Label isRequired htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          placeholder="이름을 입력해주세요."
          type="text"
          variant="solid"
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="phone">
          연락처
        </Label>
        <Input
          id="phone"
          placeholder="숫자만 입력해주세요."
          type="tel"
          variant="solid"
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="career">
          경력(개월 수)
        </Label>
        <Input
          id="career"
          placeholder="숫자만 입력해주세요."
          type="text"
          variant="solid"
        />
      </li>
      <li className={itemStyle}>
        <Label htmlFor="resume">이력서</Label>
        <div className="relative">
          <Input
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            alt="업로드"
            className="absolute h-0 w-0 overflow-hidden"
            id="resume"
            type="file"
            onChange={handleFileChange}
          />
          <IconInput
            readOnly
            alt={isFileSelected ? '삭제' : '업로드'}
            iconOnClick={isFileSelected ? handleFileDelete : handleFileSelect}
            inputClassName="text-left"
            position="right"
            src={isFileSelected ? '/icons/x-circle.svg' : '/icons/upload.svg'}
            type="button"
            value={selectedFileName || '파일을 선택해주세요.'}
          />
        </div>
      </li>
      <li className={itemStyle}>
        <Label htmlFor="introduction">자기소개</Label>
        <Textarea
          id="introduction"
          placeholder="최대 200자까지 입력 가능합니다."
          variant="solid"
        />
      </li>
      <li className={itemStyle}>
        <Label isRequired htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          variant="solid"
        />
        <span className="px-8 text-xs leading-none text-gray-400 lg:text-2lg">
          *지원내역 확인에 사용됩니다.
        </span>
      </li>
    </ul>
  );
};

export default ApplyFormList;
