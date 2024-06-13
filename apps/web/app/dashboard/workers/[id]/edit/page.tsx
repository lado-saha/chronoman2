import Form from '@/app/ui/workers/edit-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchWorkerById } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  const [worker] = await Promise.all([fetchWorkerById(id)]);
  if (!worker) {
    // this a fallback that will call the not-found.tsx file found in the path
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/workers' },
          {
            label: 'Edit Worker',
            href: `/dashboard/workers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form worker={worker} />
    </main>
  );
}
