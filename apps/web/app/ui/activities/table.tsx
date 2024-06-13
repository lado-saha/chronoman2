import {
  UpdateActivity,
  DeleteActivity,
  ConsultActivitiesActivities,
  ConsultStatistics,
} from '@/app/ui/activities/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredActivities } from '@/app/lib/data';
import Status from '../common/status';
import {
  formatGeoString,
  getStatusFromText as toStatusModel,
} from '@/app/lib/models';
import { HomeModernIcon, MapIcon, MapPinIcon } from '@heroicons/react/20/solid';
import {
  fetchCompletionPercentageForActivity,
  fetchTotalBudgetForActivity,
  fetchTotalDurationForActivity,
} from '@/app/lib/stats_data';

/**
 * This is the lis view of an a activity. should presnet the activity and then show general stats obtained from it childres(Activity -> tasks)
 * Remeber that this the first page the manager sees and
 * @param param0
 * @returns
 */
export default async function ActivityTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const activities = await fetchFilteredActivities(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="min-w-full align-middle">
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 w-full">
          {activities?.map(async (activity) => {
            const numActivities = activity.activities?.length || 0;
            const numTasks =
              activity.activities?.reduce(
                (total, activity) => total + (activity.tasks?.length || 0),
                0,
              ) || 0;
            const numWorkers = new Set(
              activity.activities?.flatMap(
                (activity) =>
                  activity.tasks?.flatMap((task) => task.workers) || [],
              ) || [],
            ).size;

            return (
              <div
                key={activity.id}
                className="mb-4 overflow-hidden rounded-lg bg-gray-50 p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-col items-start justify-between border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                  <div className="flex items-center space-x-4">
                    <HomeModernIcon className="h-12 w-12 text-gray-500" />
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {activity.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {activity.town}, {activity.region}, {activity.country}
                      </p>
                    </div>
                  </div>
                  <Status
                    status={await fetchCompletionPercentageForActivity(activity.id)}
                    // className="mt-2 sm:mt-0"
                  />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        Activity Details
                      </h3>
                      <p className="text-sm text-gray-600">
                        Started On: {formatDateToLocal(Date())}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        Budget:{' '}
                        {formatCurrency(await fetchTotalBudgetForActivity(activity.id))}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration:{' '}
                        <span className="font-medium text-gray-800">
                          {await fetchTotalDurationForActivity(activity.id)} Days
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Completion Percentage:{' '}
                        <span className="font-medium text-green-600">
                          {await fetchCompletionPercentageForActivity(activity.id)}%
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
                        {formatGeoString(activity)}
                      </p>
                    </div>
                    <div className="fill mt-4 flex space-x-2 sm:mt-0">
                      <ConsultActivitiesActivities id={activity.id} />
                      <ConsultStatistics id={activity.id} />
                      <UpdateActivity id={activity.id} />
                      <DeleteActivity id={activity.id} />
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
