import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';
import Textarea from '@/shared/components/common/input/Textarea';
import UploadSingleImage from '@/shared/components/common/uploadImage/UploadSingleImage';

const AddtalkForm = () => {
  return (
    <div className="flex flex-col gap-24 py-16 md:px-24 lg:gap-40 lg:py-48">
      <section className="flex flex-col gap-16">
        <Label isRequired htmlFor="title">
          제목
        </Label>
        <Input id="title" placeholder="제목을 입력해주세요." />
      </section>
      <section className="flex flex-col gap-16">
        <Label isRequired htmlFor="content">
          내용
        </Label>
        <Textarea
          className="h-180 md:h-200 lg:h-240"
          id="content"
          placeholder="내용을 입력해주세요."
        />
      </section>
      <section className="flex flex-col gap-16">
        <Label htmlFor="imageUrl">이미지</Label>
        <UploadSingleImage id="imageUrl" onImageChange={() => {}} />
      </section>
    </div>
  );
};
export default AddtalkForm;
