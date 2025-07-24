import Chip from '@/shared/components/common/chip/Chip';

export const getStatusLabel = (recruitmentEndDate: string) => {
  const isOngoing = new Date(recruitmentEndDate) > new Date();
  return (
    <Chip active label={isOngoing ? '모집 중' : '모집 마감'} variant="filled" />
  );
};

export const getPublicLabel = (isPublic: boolean) => {
  return <Chip active label={isPublic ? '공개' : '비공개'} variant="filled" />;
};
