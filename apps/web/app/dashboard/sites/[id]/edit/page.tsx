import Form from '@/app/ui/sites/edit-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchSiteById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [site] = await Promise.all([fetchSiteById(id)]);
  if (!site) {
    // this a fallback that will call the not-found.tsx file found in the path
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/sites' },
          {
            label: 'Edit Site',
            href: `/dashboard/sites/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form site={site} />
    </main>
  );
}
