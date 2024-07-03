import { studentLocalizedFields } from "@fcai-sis/shared-models";
import CreateStudentForm from "./CreateStudentForm";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";

export default async function Page() {
  const locale = getCurrentLocale();
  const localizedFields = studentLocalizedFields;
  return (
    <>
      <I18nProviderClient locale={locale}>
        <CreateStudentForm localizedFields={localizedFields} />
      </I18nProviderClient>
    </>
  );
}
