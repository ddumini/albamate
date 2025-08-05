'use client';

import { useRef, useState } from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Textarea from '@/shared/components/common/input/Textarea';
import { usePopupStore } from '@/shared/store/popupStore';

import { useCreateAlbatalkComment } from '../../hooks/useAlbatalk';

interface CommentFormProps {
  albatalkId: number;
  onSubmit?: (content: string) => void;
}

const CommentForm = ({ albatalkId, onSubmit }: CommentFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');
  const createCommentMutation = useCreateAlbatalkComment();
  const { showPopup } = usePopupStore();

  const handleSubmit = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    createCommentMutation.mutate(
      { postId: albatalkId, content: trimmedContent },
      {
        onSuccess: () => {
          setContent('');
          onSubmit?.(trimmedContent);
          showPopup('댓글이 등록되었습니다.', 'success');
        },
        onError: error => {
          console.error('댓글 작성 실패: ', error);
          showPopup('댓글 등록 중 오류가 발생했습니다.', 'error');
        },
      }
    );
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const isSubmitting = createCommentMutation.isPending;
  const isDisabled = !content.trim() || isSubmitting;

  return (
    <div className="flex flex-col rounded-lg lg:mb-16">
      <Textarea
        ref={textareaRef}
        required
        className="min-h-[80px] resize-y whitespace-pre-wrap"
        disabled={isSubmitting}
        id="commentContent"
        placeholder="댓글을 작성해주세요."
        value={content}
        onChange={handleTextareaChange}
      />
      <div className="mt-8 flex w-108 self-end md:w-136">
        <PrimaryButton
          className="w-full py-12 text-lg lg:w-214 lg:text-xl"
          disabled={isDisabled}
          label={isSubmitting ? '등록 중...' : '등록하기'}
          type="button"
          variant="solid"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CommentForm;
