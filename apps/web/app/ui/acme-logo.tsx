import { CalendarDaysIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function AcmeLogo() {
  return (
    <div className={` flex flex-row items-center leading-none text-white`}>
      <CalendarDaysIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="ml-2 text-[32px]">Chronoman</p>
    </div>
  );
}
