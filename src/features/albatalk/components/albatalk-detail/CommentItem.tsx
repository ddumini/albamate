'use client';

import React, { useEffect, useRef, useState } from 'react';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Textarea from '@/shared/components/common/input/Textarea';
import KebabMenuDropdown from '@/shared/components/common/kebabMenuDropdown';

import { Comment } from '../../schemas/albatalk.schema';
import AlbatalkMetaInfoUser from '../albatalk-item/AlbatalkMetaInfoUser';

interface CommentItemProps {
  comment: Comment;
  onEdit: (commentId: number, newContent: string) => void;
  onDelete: (commentId: number) => void;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.value = comment.content;
      textareaRef.current.focus();
    }
  }, [isEditing, comment.content]);

  const handleActionClick = (option: string) => {
    if (option === 'edit') {
      setIsEditing(true);
    } else if (option === 'delete') {
      onDelete(comment.id);
    }
  };

  const menuOptions = [
    { label: '수정하기', onClick: () => handleActionClick('edit') },
    { label: '삭제하기', onClick: () => handleActionClick('delete') },
  ];

  const handleConfirmEdit = () => {
    const newContent = textareaRef.current?.value || '';

    if (newContent.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    onEdit(comment.id, newContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    if (textareaRef.current) {
      textareaRef.current.value = comment.content;
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-start gap-24 border-b border-gray-100 py-16 last:border-b-0">
      <div className="flex w-full justify-between">
        <AlbatalkMetaInfoUser
          className="text-xs text-gray-500 lg:text-base"
          createdAt={comment.createdAt}
          writer={comment.writer}
        />
        <KebabMenuDropdown options={menuOptions} />
      </div>

      {isEditing ? (
        // 수정 모드일 때 (textarea와 버튼들을 보여줌)
        <div className="flex w-full flex-col gap-16 pl-4">
          <Textarea
            ref={textareaRef}
            required
            id="commentContent"
            placeholder="댓글을 작성해주세요."
          />
          <div className="flex w-208 gap-8 self-end">
            <PrimaryButton
              className="w-full py-12 text-lg text-black lg:text-xl"
              label="취소"
              type="button"
              variant="cancelSolid"
              onClick={handleCancelEdit}
            />
            <PrimaryButton
              className="w-full py-12 text-lg lg:text-xl"
              label="확인"
              type="button"
              variant="solid"
              onClick={handleConfirmEdit}
            />
          </div>
        </div>
      ) : (
        // 일반 보기 모드일 때 (댓글 내용을 보여줌)
        <p className="pl-4 text-sm leading-relaxed md:text-base lg:text-xl">
          {comment.content}
        </p>
      )}
    </div>
  );
};

export default CommentItem;
