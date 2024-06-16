import SignOutButton from "@/components/SignOutButton";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import Link from "next/link";

export default async function Navbar({ locale }: { locale: string }) {
  const t = await getI18n();
  return (
    <nav>
      <Link href="/">{t("nav.home")}</Link>
      <Link href="/students">{t("nav.students")}</Link>
      <Link href="/announcements">{t("nav.announcements")}</Link>
      <Link href="/Service Requests">{t("nav.serviceRequests")} </Link>
      <Link href="/Profile">{t("nav.profile")}</Link>
      <I18nProviderClient locale={locale}>
        <SignOutButton />
      </I18nProviderClient>
    </nav>
  );
}
