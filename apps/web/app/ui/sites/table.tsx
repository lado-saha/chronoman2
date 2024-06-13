import {
  UpdateSite,
  DeleteSite,
  ConsultSitesActivities,
  ConsultStatistics,
} from '@/app/ui/sites/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredSites } from '@/app/lib/data';
import Status from '../common/status';
import {
  formatGeoString,
  getStatusFromText as toStatusModel,
} from '@/app/lib/models';
import { HomeModernIcon, MapIcon, MapPinIcon } from '@heroicons/react/20/solid';
import {
  fetchCompletionPercentageForSite,
  fetchTotalBudgetForSite,
  fetchTotalDurationForSite,
} from '@/app/lib/stats_data';

/**
 * This is the lis view of an a site. should presnet the site and then show general stats obtained from it childres(Activity -> tasks)
 * Remeber that this the first page the manager sees and
 * @param param0
 * @returns
 */
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
      <div className="min-w-full align-middle">
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 w-full">
          {sites?.map(async (site) => {
            const numActivities = site.activities?.length || 0;
            const numTasks =
              site.activities?.reduce(
                (total, activity) => total + (activity.tasks?.length || 0),
                0,
              ) || 0;
            const numWorkers = new Set(
              site.activities?.flatMap(
                (activity) =>
                  activity.tasks?.flatMap((task) => task.workers) || [],
              ) || [],
            ).size;

            return (
              <div
                key={site.id}
                className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-col items-start justify-between border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                  <div className="flex items-center space-x-4">
                    <HomeModernIcon className="h-12 w-12 text-gray-500" />
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {site.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {site.town}, {site.region}, {site.country}
                      </p>
                    </div>
                  </div>
                  <Status
                    status={await fetchCompletionPercentageForSite(site.id)}
                    // className="mt-2 sm:mt-0"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Site Details
                      </h3>
                      <p className="text-sm text-gray-600">
                        Started On: {formatDateToLocal(Date())}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        Budget:{' '}
                        {formatCurrency(await fetchTotalBudgetForSite(site.id))}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration:{' '}
                        <span className="font-medium text-gray-800">
                          {await fetchTotalDurationForSite(site.id)} Days
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Completion Percentage:{' '}
                        <span className="font-medium text-green-600">
                          {await fetchCompletionPercentageForSite(site.id)}%
                        </span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Statistics
                      </h3>
                      <p className="text-sm text-gray-600">
                        Total Activities:{' '}
                        <span className="font-medium text-gray-800">
                          {numActivities}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Tasks:{' '}
                        <span className="font-medium text-gray-800">
                          {numTasks}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Workers:{' '}
                        <span className="font-medium text-gray-800">
                          {numWorkers}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPinIcon className="h-8 w-6 text-gray-500" />
                      <p className="text-gray-702 text-sm italic">
                        {formatGeoString(site)}
                      </p>
                    </div>
                    <div className="fill mt-4 flex space-x-2 sm:mt-0">
                      <ConsultSitesActivities id={site.id} />
                      <ConsultStatistics id={site.id} />
                      <UpdateSite id={site.id} />
                      <DeleteSite id={site.id} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
