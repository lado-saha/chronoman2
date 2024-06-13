import {
  UpdateWorker,
  DeleteWorker,
} from '@/app/ui/workers/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredWorkers } from '@/app/lib/data';
import Status from '../common/status';
import {
  formatGeoString,
  getStatusFromText as toStatusModel,
} from '@/app/lib/models';
import { HomeModernIcon, MapIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { UserIcon } from '@heroicons/react/24/outline';

export default async function WorkersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const workers = await fetchFilteredWorkers(query, currentPage);

  return (
    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {workers?.map((worker) => (
        <div
          key={worker.id}
          className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-4 shadow-md"
        >
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-4">
              <UserIcon className="h-10 w-10 text-gray-500" />
              <p className="text-xl font-semibold text-gray-800">
                {worker.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center">
            <p className="text-md text-gray-500">
              Tasks: <strong>{worker.tasks?.length}</strong>
            </p>
            <div className="mt-4 flex space-x-2 sm:mt-0">
              <UpdateWorker id={worker.id} />
              <DeleteWorker id={worker.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
