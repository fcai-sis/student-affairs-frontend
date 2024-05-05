import Image from "next/image";
import Link from "next/link";
import ProfileHolder from "./ui/icons/ProfileHolder";
import { getI18n } from "@/locales/server";

const Navbar = async () => {
  const t = await getI18n();

  return (
    <nav className='flex items-center fixed gap-2 py-2 top-0 w-[900px] h-min '>
      <Image src='/Logo.png' alt='logo' width={80} height={80} />

      <div className='flex flex-grow gap-2'>
        <Link
          className='transition duration-200 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400 h-min'
          href={"/"}
        >
          {t("home")}
        </Link>
        <Link
          className='transition duration-200 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400 h-min'
          href={"/students/view"}
        >
          {t("students")}
        </Link>
        <Link
          className='transition duration-200 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400 h-min'
          href={"/announcements"}
        >
          {t("announcements")}
        </Link>
        <Link
          className='transition duration-200 ease-in-out transform hover:scale-110 hover:bg-gray-200 px-4 py-2 rounded-md active:bg-gray-400 h-min
'
          href={"/services"}
        >
          {t("services")}
        </Link>
      </div>
      <ProfileHolder />
    </nav>
  );
};

export default Navbar;
