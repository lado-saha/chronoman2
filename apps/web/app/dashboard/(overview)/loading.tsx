import DashboardSkeleton from '../../ui/skeletons';

/**
 * Here, we will try to implement streamlining. Which means to break down a route into small chuncks which can load in parralel
 *
 * This is a fallback ui to show  during loading
 * @returns
 */
export default function Loading() {
  // return <div>Loading...</div>;
  return <DashboardSkeleton />;
}
