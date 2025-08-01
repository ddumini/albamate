import { Dispatch, SetStateAction, useEffect } from 'react';

import { Menu } from '@/features/addform/components/MenuItem';

export const useAddformWritingMenu = ({
  setWritingMenu,
  dirtyFields,
  currentFiles,
}: {
  setWritingMenu: Dispatch<SetStateAction<Record<Menu, boolean>>>;
  dirtyFields: Partial<{
    [key: string]: any;
  }>;
  currentFiles: File[];
}) => {
  useEffect(() => {
    const recruitContentDirty =
      dirtyFields.title ||
      dirtyFields.description ||
      dirtyFields.recruitmentStartDate ||
      dirtyFields.recruitmentEndDate ||
      currentFiles.length > 0;

    const recruitConditionDirty =
      dirtyFields.numberOfPositions ||
      dirtyFields.gender ||
      dirtyFields.education ||
      dirtyFields.age ||
      dirtyFields.preferred;

    const workConditionDirty =
      dirtyFields.location ||
      dirtyFields.workStartDate ||
      dirtyFields.workEndDate ||
      dirtyFields.workStartTime ||
      dirtyFields.workEndTime ||
      dirtyFields.workDays ||
      dirtyFields.isNegotiableWorkDays ||
      dirtyFields.hourlyWage ||
      dirtyFields.isPublic;

    setWritingMenu({
      recruitContent: !!recruitContentDirty,
      recruitCondition: !!recruitConditionDirty,
      workCondition: !!workConditionDirty,
    });
  }, [
    dirtyFields.title,
    dirtyFields.description,
    dirtyFields.recruitmentStartDate,
    dirtyFields.recruitmentEndDate,
    dirtyFields.numberOfPositions,
    dirtyFields.gender,
    dirtyFields.education,
    dirtyFields.age,
    dirtyFields.preferred,
    dirtyFields.location,
    dirtyFields.workStartDate,
    dirtyFields.workEndDate,
    dirtyFields.workStartTime,
    dirtyFields.workEndTime,
    dirtyFields.workDays,
    dirtyFields.isNegotiableWorkDays,
    dirtyFields.hourlyWage,
    dirtyFields.isPublic,
    currentFiles,
    setWritingMenu,
  ]);
};
