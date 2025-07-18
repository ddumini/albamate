'use client';

import { useRef, useState } from 'react';

import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';

const ApplyFormList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const isFileSelected = selectedFileName !== '';

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
    <ul>
      <li>
        <Label isRequired>이름</Label>
        <Input placeholder="이름을 입력해주세요." type="text" variant="solid" />
      </li>
      <li>
        <Label isRequired>연락처</Label>
        <Input placeholder="숫자만 입력해주세요." type="tel" variant="solid" />
      </li>
      <li>
        <Label isRequired>경력(개월 수)</Label>
        <Input placeholder="숫자만 입력해주세요." type="text" variant="solid" />
      </li>
      <li>
        <Label>이력서</Label>
        <div className="relative">
          <Input
            ref={fileInputRef}
            accept=".pdf,.doc,.docx"
            alt="업로드"
            className="absolute h-0 w-0 overflow-hidden"
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
    </ul>
  );
};

export default ApplyFormList;
