import { ChartBarIcon, ChartBarSquareIcon } from '@heroicons/react/20/solid';
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateActivity({ id }: { id: number }) {
  return (
    <Link
      href="/dashboard/activities/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Activity</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ConsultActivitiesTaks({
  siteId,
  id,
}: {
  id: number;
  siteId: number;
}) {
  return (
    <Link
      href={`/dashboard/sites/${siteId}/activities/${id}/tasks`}
      className="text-md flex h-10 items-center rounded-lg border px-2 font-medium hover:bg-gray-100"
    >
      <span className="hidden md:block">Tasks</span>{' '}
      <ArrowTopRightOnSquareIcon className="h-5 md:ml-2" />
    </Link>
  );
}
export function ConsultStatistics({
  siteId,
  id,
}: {
  id: number;
  siteId: number;
}) {
  return (
    <Link
      href={`/dashboard/sites/${siteId}/activities/${id}/stats`}
      className="text-md flex h-10 items-center rounded-lg border px-2 font-medium hover:bg-gray-100"
    >
      <span className="hidden md:block">Stats</span>{' '}
      <ChartBarIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function UpdateActivity({ siteId, id }: { id: number; siteId: number }) {
  return (
    <Link
      href={`/dashboard/sites/${siteId}/activities/${id}`}
      className="text-md flex h-10 items-center rounded-lg border px-2 font-medium hover:bg-gray-100"
    >
      <span className="hidden md:block">Update</span>{' '}
      <PencilIcon className="h-5 md:ml-2" />
    </Link>
  );
}

// export function ConsultActivitiesActivities({ id }: { id: number }) {
//   return (
//     <Link
//       href={`/dashboard/activities/${id}/activities`}
//       className="rounded-md bg-blue-300 border p-2 hover:bg-blue-500"
//     >
//       <span className="flex items-center bg-transparent">
//         <span className="mr-2">Activities</span>
//         <ArrowTopRightOnSquareIcon className="w-5" />
//       </span>
//     </Link>
//   );
// }

export function DeleteActivity({ id }: { id: number }) {
  // const deleteActivityWithId = deleteActivity.bind(null, id);
  const deleteActivityWithId = deleteActivity.bind(null, id.toString());

  return (
    <form action={deleteActivityWithId}>
      <button className="rounded-md border  bg-red-300 p-2 hover:bg-red-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
