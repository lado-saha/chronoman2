import { Suspense } from 'react';
import { Card } from '../../ui/dashboard/cards';
import LatestInvoices from '../../ui/dashboard/latest-invoices';
import RevenueChart from '../../ui/dashboard/revenue-chart';
import { fetchCardData } from '@/app/lib/data';
import {
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

/**
 * This file must always exist in any nested directory to show it as a page
 * This is an async page since it will fetch data
 *
 * Path: www.example.com/dashboard
 * @returns
 */
export default async function Page() {
  return (
    // Fetching the revenue data
    <main>
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
 
    </main>
  );
}
