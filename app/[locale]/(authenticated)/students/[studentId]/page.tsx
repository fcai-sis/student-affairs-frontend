import UpdateStudentForm from "./UpdateStudentForm";
import { studentLocalizedFields } from "@fcai-sis/shared-models";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";
import { getStudent } from "@/queries";

export default async function Page({
  params: { studentId },
}: Readonly<{ params: { locale: string; studentId: string } }>) {
  const response = await getStudent(studentId);
  const student = response.student;
  const localizedFields = studentLocalizedFields;
  const locale = getCurrentLocale();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <h1>Student details</h1>
        <UpdateStudentForm
          student={student}
          localizedFields={localizedFields}
        />
      </I18nProviderClient>
    </>
  );
}
