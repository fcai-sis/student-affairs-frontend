import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import UploadExcelForm from "./UploadExcelForm";
import { studentRegistrationAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { redirect } from "next/navigation";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const accessToken = await getAccessToken();
  const getActiveRegistrationSessionResponse = await studentRegistrationAPI.get(
    "/active",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (getActiveRegistrationSessionResponse.status === 200) {
    return redirect("/students/register/upload/mapping");
  }

  const t = await getI18n();
  return (
    <>
      <h1>{t("registerStudent.upload.title")}</h1>
      <I18nProviderClient locale={locale}>
        <UploadExcelForm />
      </I18nProviderClient>
    </>
  );
}
