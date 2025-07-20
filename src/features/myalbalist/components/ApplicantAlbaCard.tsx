'use client';

import Chip from '@common/chip/Chip';
import { format, isAfter } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

import { useClickOutside } from '@/shared/hooks/useClickOutside';

import { ApplicantMyAlbaItem } from '../types/myalbalist';

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface Props {
  item: ApplicantMyAlbaItem;
  onClick: () => void;
}

/**
 * 단일 알바 카드 컴포넌트
 *
 * @param {ApplicantMyAlbaItem} item - 내 알바폼 지원내역 전체보기
 * @param {() => void} onClick - 카드 전체 클릭 시 실행할 함수 (예: 상세 페이지 이동)
 *
 */

const ApplicantAlbaCard = ({ item, onClick }: Props) => {
  const end = new Date(item.form.recruitmentEndDate);
  const isRecruiting = isAfter(end, new Date());

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => setOpen(false));
  const status = {
    REJECTED: '거절',
    INTERVIEW_PENDING: '면접 대기',
    INTERVIEW_COMPLETED: '면접 완료',
    HIRED: '채용 완료',
  };

  return (
    <div
      className="Border-Card flex cursor-pointer flex-col gap-20 rounded-2xl p-16 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg md:px-20 md:py-24"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="font-regular flex items-center gap-16 text-xs text-gray-400 lg:text-md">
          <p className="relative after:absolute after:top-1/2 after:right-0 after:block after:h-8 after:w-1 after:translate-x-8 after:-translate-y-1/2 after:rounded-full after:bg-line-200 after:content-['']">
            지원일시
          </p>
          <p>{format(item.createdAt, 'yyyy.MM.dd HH:mm')}</p>
        </div>
        {/* TODO: 이력서 보기 기능 확인 후 수정 */}
        <Link
          className="font-regular text-400 text-xs underline lg:text-md"
          href={`/myalbalist/${item.id}`}
        >
          이력서 보기
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <div className="relative h-32 w-32 overflow-hidden rounded-full lg:h-48 lg:w-48">
            <Image
              fill
              alt={item.form.owner.storeName}
              className="object-cover object-center"
              src={item.form.owner.imageUrl || '/icons/user-profile.svg'}
            />
          </div>
          <p className="text-xs font-medium text-black-300 lg:text-lg dark:text-gray-100">
            {item.form.owner.storeName}
          </p>
        </div>

        <h3 className="Text-black text-lg font-semibold">{item.form.title}</h3>
        <p className="Text-gray line-clamp-1 lg:line-clamp-2 lg:min-h-48">
          {item.form.description}
        </p>
      </div>

      <div className="relative flex items-center gap-8 text-sm">
        <Chip active label={status[item.status]} variant="filled" />
        <Chip
          active
          label={isRecruiting ? '모집 중' : '모집 완료'}
          variant="filled"
        />
      </div>
    </div>
  );
};

export default ApplicantAlbaCard;
