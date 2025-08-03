import PrimaryButton from '@common/button/PrimaryButton';
import { useState } from 'react';

import Textarea from '@/shared/components/common/input/Textarea';

import { useUpdateMyCommentQuery } from '../queries';

interface CommentEditProps {
  id: number;
  content: string;
  close: () => void;
}

const CommentEdit = ({ id, content, close }: CommentEditProps) => {
  const [textareaValue, setTextareaValue] = useState(content);
  const upDateMyComment = useUpdateMyCommentQuery();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <Textarea
        required
        value={textareaValue}
        variant="solid"
        onChange={e => setTextareaValue(e.target.value)}
      />
      <div className="flex w-full items-center justify-center gap-6">
        <PrimaryButton
          className="w-1/2 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          label="취소하기"
          type="button"
          variant="cancelSolid"
          onClick={() => close()}
        />
        <PrimaryButton
          className="w-1/2 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          disabled={textareaValue.trim().length === 0}
          label="수정하기"
          type="button"
          variant="solid"
          onClick={() => {
            upDateMyComment.mutate(
              { id, content: textareaValue },
              {
                onSuccess: () => {
                  close();
                },
              }
            );
          }}
        />
      </div>
    </div>
  );
};

export default CommentEdit;
