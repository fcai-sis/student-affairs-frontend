import SignOutButton from "@/components/SignOutButton";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import Link from "next/link";
import Dropdown from "./Dropdown";
import ChangeLanguageButton from "./ChangeLanguageButton";
import { BookStack, Home, Megaphone, PageFlip } from "iconoir-react";
import Image from "next/image";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getI18n();

  return (
    <nav className='z-40 fixed top-0 left-0 right-0 bg-white flex justify-between items-center py-4 px-24 shadow-md gap-4'>
      <Image src={"/fcai.png"} alt='Logo' width={70} height={70} />
      <div className='flex gap-2'>
        <Link href='/' className='flex gap-2 items-center'>
          <Home />
          {t("home.title")}
        </Link>
        <Link href='/students' className='flex gap-2 items-center'>
          <BookStack />
          {t("nav.students")}
        </Link>
        <Link href='/announcements' className='flex gap-2 items-center'>
          <Megaphone />
          {t("nav.announcements")}
        </Link>
        <Link href='/requests' className='flex gap-2 items-center'>
          <PageFlip />
          {t("nav.serviceRequests")}
        </Link>
        <I18nProviderClient locale={locale}>
          <Dropdown label={t("nav.more")}>
            <Link href='/profile' className='block w-full'>
              {t("nav.profile")}
            </Link>
            <Link href='/graduation' className='block w-full'>
              {t("nav.graduation")}
            </Link>
            <Link href='/students/assign-hall' className='block w-full'>
              {t("nav.assignHall")}
            </Link>
            <SignOutButton />
          </Dropdown>
        </I18nProviderClient>
      </div>
      <I18nProviderClient locale={locale}>
        <ChangeLanguageButton />
      </I18nProviderClient>
    </nav>
  );
}
