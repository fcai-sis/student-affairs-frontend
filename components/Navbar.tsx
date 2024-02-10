import Image from "next/image";
import Link from "next/link";
import ProfileHolder from "./ui/icons/ProfileHolder";
import { getI18n } from "@/locales/server";

const Navbar = async () => {
  const t = await getI18n();

  return (
    <nav className='flex flex-wrap items-center gap-2 mb-2 mx-auto p-4 border-2 rounded-md border-b-blue-500'>
      <ProfileHolder />
      <div className='flex flex-grow gap-2'>
        <Link
          className='transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400'
          href={"/"}
        >
          {t("home")}
        </Link>
        <Link
          className='transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400'
          href={"/students/read-students"}
        >
          {t("students")}
        </Link>
        <Link
          className='transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400'
          href={"/announcements"}
        >
          {t("announcements")}
        </Link>
        <Link
          className='transition duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400
'
          href={"/services"}
        >
          {t("services")}
        </Link>
      </div>
      <Image src='/Logo.png' alt='logo' width={80} height={80} />
    </nav>
  );
};

export default Navbar;
