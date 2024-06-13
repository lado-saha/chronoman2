'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { Worker } from '@/app/lib/models';
import { updateWorker } from '@/app/lib/actions';

export default function EditWorkerForm({ worker }: { worker: Worker }) {
  // This will automatically bind the id to the path
  const updateWorkerWithId = updateWorker.bind(null, worker.id, worker);

  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(updateWorkerWithId, initialState);

  /*This cannot work: <form action={updateWorker(id)}></form> */
  return (
    <form action={dispatch}>
      {/* Worker Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Worker Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={worker.name}
              placeholder="Enter worker name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        {/* To show when there is an error in the name field */}
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/workers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Worker</Button>
      </div>
      </div>
    </form>
  );
}
