'use client';

import Chip from '@common/chip/Chip';
import { format, isAfter } from 'date-fns';
import Image from 'next/image';
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
 * @param {ApplicantMyAlbaItem} item - 알바 정보 (제목, 이미지, 모집기간, 지원자 수 등)
 * @param {() => void} onClick - 카드 전체 클릭 시 실행할 함수 (예: 상세 페이지 이동)
 *
 * 사용 예시
 * <ApplicantAlbaCard key={`${item.id}-${item.recruitmentEndDate}`} item={item} />
 *
 */

const ApplicantAlbaCard = ({ item, onClick }: Props) => {
  const start = new Date(item.form.recruitmentStartDate);
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
      className="Border-Card cursor-pointer flex-col gap-8 rounded-2xl p-16 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
      onClick={onClick}
    >
      <div>
        <div>
          <Image
            alt={item.form.owner.storeName}
            height={40}
            src={item.form.owner.imageUrl}
            width={40}
          />
        </div>
      </div>
      <h3 className="Text-black mt-12 text-lg font-semibold">
        {item.form.title}
      </h3>
      <p>{item.form.description}</p>
      <div className="relative mt-12 flex items-center gap-8 pb-30 text-sm xs:pt-0">
        <Chip active label={status[item.status]} variant="filled" />
        <Chip
          active
          label={isRecruiting ? '모집 중' : '모집 완료'}
          variant="filled"
        />
        <span className="Text-gray absolute bottom-0 left-0 whitespace-nowrap xs:static">
          {format(start, 'yyyy.MM.dd')} ~ {format(end, 'yyyy.MM.dd')}
        </span>
      </div>
    </div>
  );
};

export default ApplicantAlbaCard;
