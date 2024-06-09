import Form from '@/app/ui/sites/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Page() {
  // We get all the customers first

  return (
    <main>
      {/* The breadcrumps helps the user see his current location. sites/Create Invoice  */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sites', href: '/dashboard/sites' },
          {
            label: 'Create Construction Site',
            href: '/dashboard/sites/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
