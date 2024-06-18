import { studentRegistrationAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { getI18n } from "@/locales/server";
import { redirect } from "next/navigation";
import MappingFieldSelect from "./MappingFieldSelect";
import { I18nProviderClient } from "@/locales/client";
import CancelSessionForm from "./CancelSessionForm";
import CommitSessionForm from "./CommitSessionForm";
import { GetActiveRegistrationSessionResponse } from "./types";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const accessToken = await getAccessToken();
  const t = await getI18n();
  const getActiveRegistrationSessionResponse =
    await studentRegistrationAPI.get<GetActiveRegistrationSessionResponse>(
      "/active",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

  if (getActiveRegistrationSessionResponse.status !== 200) {
    return redirect("/students/register/upload");
  }

  const {
    registrationSession: { mapping, excelColumnsHeaders },
    fieldNames,
  } = getActiveRegistrationSessionResponse.data;

  return (
    <>
      <h1>{t("registerStudent.upload.mapping.title")}</h1>
      <p>{t("registerStudent.upload.mapping.instructions")}</p>
      <I18nProviderClient locale={locale}>
        <CommitSessionForm />
        <CancelSessionForm />
        {Object.keys(mapping).map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              {locale === "ar" ? fieldNames[key].ar : fieldNames[key].en}
            </label>
            <MappingFieldSelect
              fieldName={key}
              defaultValue={mapping[key]}
              options={excelColumnsHeaders}
            />
          </div>
        ))}
      </I18nProviderClient>
    </>
  );
}
