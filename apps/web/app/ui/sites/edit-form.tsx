'use client';

import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { Site, getStatusText, statusOptions } from '@/app/lib/models';
import { updateSite } from '@/app/lib/actions';

export default function EditSiteForm({ site }: { site: Site }) {
  // This will automatically bind the id to the path
  const updateSiteWithId = updateSite.bind(null, site.id, site);

  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useFormState(updateSiteWithId, initialState);

  /*This cannot work: <form action={updateSite(id)}></form> */
  return (
    <form action={dispatch}>
      {/* Site Name */}
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Site Name
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={site.name}
              placeholder="Enter site name"
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
          defaultValue={site.country}
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
          defaultValue={site.region}
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
          defaultValue={site.town}
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
          defaultValue={site.longitude}
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
          defaultValue={site.latitude}
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
          defaultValue={Date.parse(site.startDate)}
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

      <div className="mb-4">
        <label htmlFor="duration" className="mb-2 block text-sm font-medium">
          Site Estimated Duration
        </label>
        <input
          id="duration"
          name="duration"
          type="number"
          placeholder="Enter site duration in days"
          defaultValue={site.duration}
          className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
        />
        <div id="endDate-error" aria-live="polite" aria-atomic="true">
          {state.errors?.duration?.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>
      </div>

      <fieldset disabled>
        <legend className="mb-2 block text-sm font-medium">
          Current Site Status
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
                    // value={value}
                    checked={value === site.status}
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
          defaultValue={site.stakeholders}
          placeholder="Enter site stakeholders"
          className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder-gray-500 outline-none"
        />
      </div>

      {/* Site Budget */}
      <div className="mb-4">
        <label htmlFor="budget" className="mb-2 block text-sm font-medium">
          Site Budget
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="budget"
              name="budget"
              type="number"
              step="0.01"
              defaultValue={site.budget}
              placeholder="Enter site budget"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
        {/* To show when there is an error in the budget field */}
      </div>
      {/* Site Description */}
      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Site Description
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <textarea
              id="description"
              name="description"
              defaultValue={site.description}
              placeholder="Enter site description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/sites"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Site</Button>
      </div>
    </form>
  );
}
