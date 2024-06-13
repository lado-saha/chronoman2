import Form from '@/app/ui/workers/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // We get all the customers first

  return (
    <main>
      {/* The breadcrumps helps the user see his current location. workers/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Workers', href: '/dashboard/workers' },
          {
            label: 'Add Construction Worker',
            href: '/dashboard/workers/add',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
