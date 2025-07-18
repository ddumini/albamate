import ApplyFormList from '@/features/apply/components/ApplyFormList';
import { APPLY_FORM_STYLE } from '@/features/apply/constants/styles';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

const ApplyForm = () => {
  return (
    <form>
      <ApplyFormList />
      <div className="flex flex-col gap-10 py-10 lg:mt-48 lg:flex-row lg:gap-8 lg:py-0">
        <PrimaryButton
          className={APPLY_FORM_STYLE.button}
          label="임시 저장"
          type="button"
          variant="outline"
        />
        <PrimaryButton
          className={APPLY_FORM_STYLE.button}
          label="작성 완료"
          type="submit"
          variant="solid"
        />
      </div>
    </form>
  );
};

export default ApplyForm;
