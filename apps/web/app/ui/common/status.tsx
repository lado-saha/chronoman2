import React from 'react';
import clsx from 'clsx';
import { TaskStatus, getStatusText, statusOptions } from '@/app/lib/models';

export default function Status({ status }: { status: TaskStatus }) {
  // console.log(status)
  const statusOption = statusOptions.find((option) => option.value === status);

  if (!statusOption) {
    console.log('Not found');
    return null; // or handle unknown status
  }

  const { value, color, icon: IconComponent } = statusOption;

  return (
    <span
      className={clsx(
        ' inline-flex cursor-pointer items-center  rounded-full px-3 py-1.5 text-xs font-medium text-white',
        color,
      )}
    >
      {getStatusText(value)}

      <IconComponent className="ml-3 h-4 w-4" />
    </span>
  );
}
