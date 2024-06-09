// models.ts
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

// Type alias for site

export type Site = {
  id: number;
  name: string;
  startDate: string;
  status: StatusModel;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  duration: number;
  stakeholders?: string;
  budget: number;
  latitude: number;
  longitude: number;
  region: string;
  town: string;
  country: string;
  // user: String,
  totalActivityDuration: number;
};

export function formatGeoString(site: Site): string {
  const latDirection = site.latitude >= 0 ? 'N' : 'S';
  const longDirection = site.longitude >= 0 ? 'E' : 'W';

  const formattedLatitude = `${Math.abs(site.latitude).toFixed(
    4,
  )}° ${latDirection}`;
  const formattedLongitude = `${Math.abs(site.longitude).toFixed(
    4,
  )}° ${longDirection}`;

  return `${site.country}, ${site.region}, ${site.town} - ${formattedLatitude}, ${formattedLongitude}`;
}

// Type alias for PredefinedActivity
export type PredefinedActivity = {
  id: number;
  name: string;
  description?: string;
};

// Type alias for PredefinedTask
export type PredefinedTask = {
  id: number;
  activityId: number;
  name: string;
  description?: string;
};

// Type alias for Activity
export type Activity = {
  id: number;
  predefinedActivityId: number;
  siteId: number;
  status: StatusModel;
  duration: number;
  comment?: string;
  startDate: string;
  realEndDate?: string;
  createdAt: string;
  updatedAt: string;
  totalTaskDuration: number;
};

// Type alias for Task
export type Task = {
  id: number;
  activityId: number;
  predefinedTaskId: number;
  status: StatusModel;
  duration: number;
  comment?: string;
  startDate: string;
  realEndDate?: string;
  createdAt: string;
  updatedAt: string;
};

// Type alias for User
export type User = {
  id: string;
  password: string;
  name: string;
  role: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
};

export enum StatusModel {
  PLANNED = 'PLANNED',
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  ONGOING_OVERTIME = 'ONGOING_OVERTIME',
  COMPLETED_EARLY = 'COMPLETED_EARLY',
  COMPLETED_OVERTIME = 'COMPLETED_OVERTIME',
}

export const statusOptions = [
  {
    value: StatusModel.PLANNED,
    color: 'bg-gray-500',
    icon: CalendarDaysIcon,
  },
  {
    value: StatusModel.ONGOING,
    color: 'bg-blue-500',
    icon: ClockIcon,
  },

  {
    value: StatusModel.ONGOING_OVERTIME,
    color: 'bg-yellow-500',
    icon: ClockIcon,
  },
  {
    value: StatusModel.COMPLETED,
    color: 'bg-green-500',
    icon: CheckIcon,
  },
  {
    value: StatusModel.COMPLETED_EARLY,
    color: 'bg-green-700',
    icon: CheckIcon,
  },
  {
    value: StatusModel.COMPLETED_OVERTIME,
    color: 'bg-red-500',
    icon: CheckIcon,
  },
];

export function getStatusText(status: StatusModel): string {
  switch (status) {
    case StatusModel.PLANNED:
      return 'Planned';
    case StatusModel.COMPLETED:
      return 'Completed';
    case StatusModel.ONGOING:
      return 'Ongoing';
    case StatusModel.ONGOING_OVERTIME:
      return 'Ongoing Overtime';
    case StatusModel.COMPLETED_EARLY:
      return 'Completed Early';
    case StatusModel.COMPLETED_OVERTIME:
      return 'Completed Undertime';
    default:
      return 'Unknown Status';
  }
}

export function getStatusFromText(text: string | null): StatusModel {
  switch (text?.toLowerCase()) {
    case 'planned':
      return StatusModel.PLANNED;
    case 'completed':
      return StatusModel.COMPLETED;
    case 'ongoing':
      return StatusModel.ONGOING;
    case 'ongoing overtime':
      return StatusModel.ONGOING_OVERTIME;
    case 'completed early':
      return StatusModel.COMPLETED_EARLY;
    case 'completed undertime':
      return StatusModel.COMPLETED_OVERTIME;
    default:
      throw Error('Invalid status');
  }
}
