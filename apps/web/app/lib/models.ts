// models.ts
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

// Type alias for site

export interface Site {
  id: number;
  name: string;
  activities?: Activity[];
  latitude: number;
  longitude: number;
  town: string;
  country: string;
  region: string;
  description?: string;
}

export interface Activity {
  id: number;
  site?: Site;
  tasks: Task[];
  name: string;
  description: string;
}

export interface Task {
  id: number;
  activity: Activity;
  name: string;
  duration: number;
  description: string;
  status: TaskStatus;
  workers: Worker[];
  budget: number;
  realStartDate: Date | null;
  realEndDate: Date | null;
}

// export interface PredefinedTask {
//   id: number;
//   predefinedActivity: PredefinedActivity;
//   description: string;
//   name: string;
// }

// export interface PredefinedActivity {
//   id: number;
//   name: string;
//   description: string;
//   predefinedTasks: PredefinedTask[];
// }
export interface Worker {
  id: number;
  name: string;
  tasks?: Task[];
}

// export interface User {
//   id: string;
//   password: string;
//   name?: string;
//   email: string;
//   role: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   lastLogin?: Date;
// }

// export enum TaskStatus {
//   PENDING = 'PENDING',
//   IN_PROGRESS = 'IN_PROGRESS',
//   COMPLETED = 'COMPLETED',
// }

export function formatGeoString(site: Site): string {
  const latDirection = site.latitude >= 0 ? 'N' : 'S';
  const longDirection = site.longitude >= 0 ? 'E' : 'W';

  const formattedLatitude = `${Math.abs(site.latitude).toFixed(
    4,
  )}° ${latDirection}`;
  const formattedLongitude = `${Math.abs(site.longitude).toFixed(
    4,
  )}° ${longDirection}`;

  return `${formattedLatitude}, ${formattedLongitude}`;
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

export enum TaskStatus {
  PLANNED = 'PLANNED',
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  ONGOING_OVERTIME = 'ONGOING_OVERTIME',
  COMPLETED_EARLY = 'COMPLETED_EARLY',
  COMPLETED_OVERTIME = 'COMPLETED_OVERTIME',
}

export const statusOptions = [
  {
    value: TaskStatus.PLANNED,
    color: 'bg-gray-500',
    icon: CalendarDaysIcon,
  },
  {
    value: TaskStatus.ONGOING,
    color: 'bg-blue-500',
    icon: ClockIcon,
  },

  {
    value: TaskStatus.ONGOING_OVERTIME,
    color: 'bg-yellow-500',
    icon: ClockIcon,
  },
  {
    value: TaskStatus.COMPLETED,
    color: 'bg-green-500',
    icon: CheckIcon,
  },
  {
    value: TaskStatus.COMPLETED_EARLY,
    color: 'bg-green-700',
    icon: CheckIcon,
  },
  {
    value: TaskStatus.COMPLETED_OVERTIME,
    color: 'bg-red-500',
    icon: CheckIcon,
  },
];

export function getStatusText(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.PLANNED:
      return 'Planned';
    case TaskStatus.COMPLETED:
      return 'Completed';
    case TaskStatus.ONGOING:
      return 'Ongoing';
    case TaskStatus.ONGOING_OVERTIME:
      return 'Ongoing Overtime';
    case TaskStatus.COMPLETED_EARLY:
      return 'Completed Early';
    case TaskStatus.COMPLETED_OVERTIME:
      return 'Completed Undertime';
    default:
      return 'Unknown Status';
  }
}

export function getStatusFromText(text: string | null): TaskStatus {
  switch (text?.toLowerCase()) {
    case 'planned':
      return TaskStatus.PLANNED;
    case 'completed':
      return TaskStatus.COMPLETED;
    case 'ongoing':
      return TaskStatus.ONGOING;
    case 'ongoing overtime':
      return TaskStatus.ONGOING_OVERTIME;
    case 'completed early':
      return TaskStatus.COMPLETED_EARLY;
    case 'completed undertime':
      return TaskStatus.COMPLETED_OVERTIME;
    default:
      throw Error('Invalid status');
  }
}
