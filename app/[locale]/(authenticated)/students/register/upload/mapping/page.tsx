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
    <div className='max-w-2xl mx-auto p-4 border shadow-md'>
      <h1 className='text-3xl font-bold mb-4'>
        {t("registerStudent.upload.mapping.title")}
      </h1>
      <p className='mb-6'>{t("registerStudent.upload.mapping.instructions")}</p>
      <I18nProviderClient locale={locale}>
        {Object.keys(mapping).map((key) => (
          <div key={key} className='mb-4'>
            <label htmlFor={key} className='block mb-2 font-semibold'>
              {locale === "ar" ? fieldNames[key].ar : fieldNames[key].en}
            </label>
            <MappingFieldSelect
              fieldName={key}
              defaultValue={mapping[key]}
              options={excelColumnsHeaders}
            />
          </div>
        ))}
        <div className='mb-6'>
          <CommitSessionForm />
        </div>
        <div className='mb-6'>
          <CancelSessionForm />
        </div>
      </I18nProviderClient>
    </div>
  );
}
