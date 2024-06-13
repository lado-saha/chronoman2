// import { deleteWorker } from '@/app/lib/actions';
import { deleteWorker } from '@/app/lib/actions';
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function AddWorker() {
  return (
    <Link
      href="/dashboard/workers/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add Worker</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateWorker({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/workers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// export function ConsultWorkersActivities({ id }: { id: number }) {
//   return (
//     <Link
//       href={`/dashboard/workers/${id}/activities`}
//       className="rounded-md bg-blue-300 border p-2 hover:bg-blue-500"
//     >
//       <span className="flex items-center bg-transparent">
//         <span className="mr-2">Activities</span>
//         <ArrowTopRightOnSquareIcon className="w-5" />
//       </span>
//     </Link>
//   );
// }

export function DeleteWorker({ id }: { id: number }) {
  // const deleteWorkerWithId = deleteWorker.bind(null, id);
  const deleteWorkerWithId = deleteWorker.bind(null, id.toString());

  return (
    <form action={deleteWorkerWithId}>
      <button className="rounded-md border  bg-red-300 p-2 hover:bg-red-500">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
