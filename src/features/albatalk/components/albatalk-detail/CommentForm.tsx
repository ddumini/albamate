'use client';

import { useRef } from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Textarea from '@/shared/components/common/input/Textarea';

interface CommentFormProps {
  postId: number;
  onSubmit?: (content: string) => void;
}

const CommentForm = ({ postId, onSubmit }: CommentFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const content = textareaRef.current?.value ?? '';
    if (!content.trim()) return;
    onSubmit?.(content);
    if (textareaRef.current) {
      textareaRef.current.value = '';
    }
    //TODO: 실제 댓글 등록 API 호출
    console.log('댓글 등록: ', { postId, content });
  };

  return (
    <div className="flex flex-col rounded-lg lg:mb-16">
      <Textarea
        ref={textareaRef}
        required
        className=""
        id="commentContent"
        placeholder="댓글을 작성해주세요."
      />
      <div className="mt-8 flex w-108 self-end md:w-136">
        <PrimaryButton
          className="w-full py-12 text-lg lg:w-214 lg:text-xl"
          disabled={false}
          label="등록하기"
          type="button"
          variant="solid"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CommentForm;
