import {
  UpdateSite,
  DeleteSite,
  ConsultSitesActivities,
} from '@/app/ui/sites/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredSites } from '@/app/lib/data';
import Status from '../common/status';
import {
  formatGeoString,
  getStatusFromText as toStatusModel,
} from '@/app/lib/models';
import { HomeModernIcon, MapIcon, MapPinIcon } from '@heroicons/react/20/solid';

export default async function SitesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sites = await fetchFilteredSites(query, currentPage);

 return (
  <div className="mt-6 flow-root">
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-white  ">
        {sites?.map((site) => (
          <div key={site.id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-md overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center space-x-4">
                <HomeModernIcon className="text-gray-500 w-10 h-10" />
                <p className="text-xl font-semibold text-gray-800">{site.name}</p>
              </div>
              <Status status={site.status} />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full">
                <div className="space-y-2 sm:space-y-0">
                  <p className="text-sm text-gray-600">Started On: {formatDateToLocal(site.startDate)}</p>
                  <p className="text-sm font-medium text-gray-800">Budget: {formatCurrency(site.budget)}</p>
                  <p className="text-sm text-gray-600">Duration: <span className="font-medium text-gray-800">{site.duration} Days</span></p>
                  <p className="text-sm text-gray-600">Completion Percentage: <span className="font-medium text-green-600">40%</span></p>
                </div>
                <div className="flex items-center mt-4 sm:mt-0">
                  <MapPinIcon className="text-gray-500 w-6 h-6 mr-2" />
                  <p className="text-sm text-gray-700 italic">{formatGeoString(site)}</p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <ConsultSitesActivities id={site.id} />
                <UpdateSite id={site.id} />
                <DeleteSite id={site.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
