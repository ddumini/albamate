'use client';

import { ChangeEvent } from 'react';

import { cn } from '@/shared/lib/cn';

export interface InputFileProps {
  /**
   * input 요소의 고유 ID입니다. `label`의 `htmlFor` 속성과 연결하는 데 사용될 수 있습니다.
   */
  id?: string;
  /**
   * 파일 선택 대화 상자에서 허용할 파일 유형을 지정합니다 (예: 'image/*', '.pdf', 'audio/*').
   */
  accept?: string;
  /**
   * 여러 파일 선택을 허용할지 여부를 지정합니다. `true`이면 여러 파일을 선택할 수 있습니다.
   */
  multiple?: boolean;
  /**
   * input 요소에 적용될 추가 Tailwind CSS 클래스입니다.
   */
  className?: string;
  /**
   * 허용되는 최대 파일 크기를 메가바이트(MB) 단위로 지정합니다.
   */
  maxFileSizeMb?: number;
  /**
   * 허용되는 파일 MIME 타입 배열입니다 (예: ['image/jpeg', 'image/png']).
   */
  validFileTypes?: string[];
  /**
   * 유효성 검사를 통과한 파일 목록이 변경될 때 호출되는 콜백 함수입니다.
   */
  onChange: (files: File[]) => void;
}

/**
 * InputFile 컴포넌트입니다.
 * 파일 선택 시 유효성 검사(파일 크기, 파일 유형)를 합니다.
 * 유효성 검사를 통과한 파일들을 `onChange` 콜백을 통해 상위 컴포넌트로 전달합니다.
 *
 * @example
 * <InputFile
 *   accept="image/*"
 *   maxFileSizeMb={5}
 *   multiple={multiple}
 *   validFileTypes={['image/png','image/jpg']}
 *   onChange={handleImageChange}
 * />
 */
const InputFile = ({
  id,
  accept,
  multiple,
  className,
  maxFileSizeMb,
  validFileTypes,
  onChange,
}: InputFileProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const validFiles: File[] = [];
    if (!files) return;
    for (const file of files) {
      if (maxFileSizeMb && file.size > maxFileSizeMb * 1024 * 1024) {
        alert(`${file.name}의 크기가 ${maxFileSizeMb}MB보다 큽니다.`); //토스트나 에러 메시지로 변경 가능 할 거 같습니다.
        continue;
      }
      if (validFileTypes && !validFileTypes.includes(file.type)) {
        alert(`${file.name}의 ${file.type}형식이 지원되지 않습니다.`);
        continue;
      }
      validFiles.push(file);
    }
    e.target.value = '';
    onChange(validFiles);
  };
  return (
    <input
      accept={accept}
      className={cn('opacity-0', className)}
      id={id}
      multiple={multiple}
      type="file"
      onChange={handleFileChange}
    />
  );
};
export default InputFile;
