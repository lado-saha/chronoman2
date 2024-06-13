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
