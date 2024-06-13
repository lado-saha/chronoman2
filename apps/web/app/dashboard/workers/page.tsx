import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/workers/table';
import { AddWorker } from '@/app/ui/workers/buttons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchWorkersPages } from '@/app/lib/data';
export const metadata: Metadata = {
  title: 'Workers',
};
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchWorkersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Workers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search workers..." />
        <AddWorker />
      </div>

      {/* Shows the workers loading */}
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
