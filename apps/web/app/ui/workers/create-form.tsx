'use client';

import Link from 'next/link';
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createWorker } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  // Must have the message and errors fields
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createWorker, initialState); // Assuming createWorker function is defined elsewhere

  return (
    // <form action={dispatch} className="mx-auto max-w-lg">

    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Worker Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Worker Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter worker name"
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
          href="/dashboard/workers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Worker</Button>
      </div>
    </form>
  );
}
