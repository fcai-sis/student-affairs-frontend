import { getI18n } from "@/locales/server";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import { I18nProviderClient } from "@/locales/client";
import { getAllDepartments } from "@/queries";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getI18n();

  const { departments } = await getAllDepartments();
  return (
    <>
      <h1>{t("announcements.create.title")}</h1>
      <I18nProviderClient locale={locale}>
        <CreateAnnouncementForm departments={departments} />
      </I18nProviderClient>
    </>
  );
}
