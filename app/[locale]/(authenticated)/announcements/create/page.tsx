import { getI18n } from "@/locales/server";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import { I18nProviderClient } from "@/locales/client";
import { getDepartments } from "../page";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getI18n();

  const getDepartmentsResponse = await getDepartments();

  const departments = getDepartmentsResponse.departments;
  return (
    <>
      <h1>{t("announcements.create.title")}</h1>
      <I18nProviderClient locale={locale}>
        <CreateAnnouncementForm departments={departments} />
      </I18nProviderClient>
    </>
  );
}
