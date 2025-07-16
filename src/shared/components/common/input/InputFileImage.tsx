'use client';

import InputFile, {
  InputFileProps,
} from '@/shared/components/common/input/InputFile';

interface InputFileImageProps
  extends Pick<InputFileProps, 'id' | 'multiple' | 'className'> {
  /**
   * 유효성 검사를 통과한 이미지 파일 목록이 변경될 때 호출되는 콜백 함수입니다.
   */
  onImageChange: (files: File[]) => void;
}

const validImageTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
];

/**
 * 이미지 파일 업로드에 사용되는 InputFileImage 컴포넌트 입니다.
 * 기본적으로 `accept="image/*"`, `maxFileSizeMb=5`, 그리고 `validImageTypes`를 사용하여
 * 이미지 파일에 대한 사전 정의된 유효성 검사를 적용합니다.
 */
const InputFileImage = ({
  id,
  multiple,
  className,
  onImageChange,
}: InputFileImageProps) => {
  const handleImageChange = (files: File[]) => {
    onImageChange(files);
  };
  return (
    <InputFile
      accept="image/*"
      className={className}
      id={id}
      maxFileSizeMb={5}
      multiple={multiple}
      validFileTypes={validImageTypes}
      onChange={handleImageChange}
    />
  );
};
export default InputFileImage;
