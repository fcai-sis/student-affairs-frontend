import { getI18n } from "@/locales/server";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import { I18nProviderClient } from "@/locales/client";
import { departmentsAPI } from "@/api";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getI18n();

  const getDepartmentsResponse = await departmentsAPI.get("/", {
    params: {
      page: 1,
      pageSize: 10,
    },
  });

  if (getDepartmentsResponse.status !== 200) {
    throw new Error("Failed to fetch departments");
  }

  const { departments } = getDepartmentsResponse.data;

  return (
    <>
      <h1>{t("announcements.create.title")}</h1>
      <I18nProviderClient locale={locale}>
        <CreateAnnouncementForm departments={departments} />
      </I18nProviderClient>
    </>
  );
}
