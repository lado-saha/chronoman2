import ChronomanLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';
import { auth } from '@/auth';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className={styles.shape} />
          <p className={` text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Chronoman.</strong> This app was created by{' '}
            <strong>3GC-2026 </strong>to help you schedule all the tasks in your
            construction site. Please Login/signup to continue.
          </p>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Login/Signup</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>

          <p className={` md:text-1xl text-xl text-gray-400 md:leading-normal`}>
            Created using Nextjs, Springboot, Electronjs and H2 db 2024
          </p>

        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* We load images stored in the public bucket */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block" /*Hide it from small screen */
            alt="Screenshots of the dashboard project showing desktop version"
          />
          {/* Mobile version */}
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden" /*Notice the md: is for desktop */
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
