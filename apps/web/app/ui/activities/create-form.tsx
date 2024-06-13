'use client';

import Link from 'next/link';
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createActivity } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ siteId }: { siteId: number }) {
  // Must have the message and errors fields
  const initialState = { message: '', errors: {} };
  const createActivityBySite = createActivity.bind(null, (siteId = siteId));
  const [state, dispatch] = useFormState(createActivityBySite, initialState); // Assuming createActivity function is defined elsewhere

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Activity Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Activity Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter activity name"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="name-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Activity Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter activity description"
            className="block w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            rows={3}
          />
        </div>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/activitys/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Activity</Button>
      </div>
    </form>
  );
}
