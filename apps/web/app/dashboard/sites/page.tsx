import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/sites/table';
import { CreateSite } from '@/app/ui/sites/buttons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { fetchSitesPages } from '@/app/lib/data';
export const metadata: Metadata = {
  title: 'Sites',
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
  const totalPages = await fetchSitesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={` text-2xl`}>Sites</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search sites..." />
        <CreateSite />
      </div>

      {/* Shows the sites loading */}
      <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
