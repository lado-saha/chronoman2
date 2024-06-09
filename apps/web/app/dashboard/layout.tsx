import SideNav from '@/app/ui/dashboard/sidenav';
// Layouts used to share
/**
 * Any thing added here will be shared across all children of the dashboard
 * Here, we will create a SideBar
 *
 * The children prop can either be a another Page or Layout
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
