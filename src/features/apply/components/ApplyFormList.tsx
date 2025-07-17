import Input from '@/shared/components/common/input/Input';
import Label from '@/shared/components/common/input/Label';

const ApplyFormList = () => {
  return (
    <ul>
      <li>
        <Label isRequired>이름</Label>
        <Input placeholder="이름을 입력해주세요." variant="solid" />
      </li>
    </ul>
  );
};

export default ApplyFormList;
