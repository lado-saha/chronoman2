// import { deleteSite } from '@/app/lib/actions';
import { deleteSite } from '@/app/lib/actions';
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateSite() {
  return (
    <Link
      href="/dashboard/sites/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Site</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ConsultSitesActivities({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/sites/${id}/activities`}
      className="flex h-10 items-center rounded-lg border px-2 text-md font-medium hover:bg-gray-100"

    >
      <span className="hidden md:block">Activities</span>{' '}
      <ArrowTopRightOnSquareIcon className="h-5 md:ml-2" />
    </Link>
  );
}

export function UpdateSite({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/sites/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// export function ConsultSitesActivities({ id }: { id: number }) {
//   return (
//     <Link
//       href={`/dashboard/sites/${id}/activities`}
//       className="rounded-md bg-blue-300 border p-2 hover:bg-blue-500"
//     >
//       <span className="flex items-center bg-transparent">
//         <span className="mr-2">Activities</span>
//         <ArrowTopRightOnSquareIcon className="w-5" />
//       </span>
//     </Link>
//   );
// }

export function DeleteSite({ id }: { id: number }) {
  // const deleteSiteWithId = deleteSite.bind(null, id);
  const deleteSiteWithId = deleteSite.bind(null, id.toString());

  return (
    <form action={deleteSiteWithId}>
      <button className="rounded-md bg-red-300  border p-2 hover:bg-red-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
