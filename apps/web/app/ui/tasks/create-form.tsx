'use client';

import Link from 'next/link';
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createSite } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { TaskStatus, getStatusText, statusOptions } from '@/app/lib/models';

export default function Form() {
  // Must have the message and errors fields
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(createSite, initialState); // Assuming createSite function is defined elsewhere

  return (
    // <form action={dispatch} className="mx-auto max-w-lg">

    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Site Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Site Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter site name"
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
        {/* Cuntry */}
        <div className="mb-4">
          <label htmlFor="country" className="mb-2 block text-sm font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            required
            placeholder="Enter site's country"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="country-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="country-error" aria-live="polite" aria-atomic="true">
            {state.errors?.country?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="region" className="mb-2 block text-sm font-medium">
            Region
          </label>
          <input
            id="region"
            name="region"
            type="text"
            required
            placeholder="Enter country region or state "
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="region-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="region-error" aria-live="polite" aria-atomic="true">
            {state.errors?.region?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="town" className="mb-2 block text-sm font-medium">
            Town
          </label>
          <input
            id="town"
            name="town"
            type="text"
            required
            placeholder="Enter site's town"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="town-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="town-error" aria-live="polite" aria-atomic="true">
            {state.errors?.town?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Latlng */}
        <div className="mb-4">
          <label htmlFor="latitude" className="mb-2 block text-sm font-medium">
            longitude
          </label>
          <input
            id="longitude"
            name="longitude"
            type="number"
            step="0.00000001"
            required
            placeholder="Enter site's longitude"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="longitude-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="longitude-error" aria-live="polite" aria-atomic="true">
            {state.errors?.longitude?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="latitude" className="mb-2 block text-sm font-medium">
            Latitude
          </label>
          <input
            id="latitude"
            name="latitude"
            type="number"
            step="0.00000001"
            required
            placeholder="Enter site's latitude"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="latitude-error"
          />
          {/* To show when there is an error in the name field */}
          <div id="latitude-error" aria-live="polite" aria-atomic="true">
            {state.errors?.latitude?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Site Start Date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium">
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
            aria-describedby="startDate-error"
          />
          {/* To show when there is an error in the start date field */}
          <div id="startDate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.startDate?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Site End Date */}
        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-sm font-medium">
            Site Estimated Duration
          </label>
          <input
            id="duration"
            name="duration"
            required
            placeholder="Enter site duration in days"
            type="number"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
          />
          {/* To show when there is an error in the start date field */}
          <div id="duration-error" aria-live="polite" aria-atomic="true">
            {state.errors?.duration?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        {/* Site Status */}
        <fieldset disabled>
          <legend className="mb-2 block text-sm font-medium">
            Set the site status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {statusOptions.map(({ value, color, icon }) => {
                const IconComponent = icon;

                return (
                  <div key={value} className="flex items-center">
                    <input
                      disabled
                      id={getStatusText(value)}
                      name="status"
                      type="radio"
                      value={value}
                      // defaultChecked={value === StatusModel.PLANNED}
                      checked = {value === TaskStatus.PLANNED}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                      htmlFor={getStatusText(value)}
                      className={`ml-2 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white ${color}`}
                    >
                      {getStatusText(value)}
                      <IconComponent className="h-4 w-4" />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </fieldset>
        {/* Site Budget */}
        <div className="mb-4">
          <label htmlFor="budget" className="mb-2 block text-sm font-medium">
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            step="0.01"
            placeholder="Enter site budget in FCFA"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
          />
        </div>
        {/* Site Stakeholders */}
        <div className="mb-4">
          <label
            htmlFor="stakeholders"
            className="mb-2 block text-sm font-medium"
          >
            Stakeholders
          </label>
          <input
            id="stakeholders"
            name="stakeholders"
            type="text"
            placeholder="Enter site stakeholders"
            className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
          />
        </div>
        {/* Site Description */}
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
            placeholder="Enter site description"
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
          href="/dashboard/sites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Site</Button>
      </div>
    </form>
  );
}
