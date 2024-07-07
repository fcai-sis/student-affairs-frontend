import CreateGraduationForm from "./CreateGraduationForm";
import { I18nProviderClient } from "@/locales/client";
import {
  getGraduationProjectEnrollments,
  getGraduationProjectTeachings,
} from "@/queries";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const { enrollments } = await getGraduationProjectEnrollments();
  const { instructorTeachings, taTeachings } =
    await getGraduationProjectTeachings();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <CreateGraduationForm
          enrollments={enrollments}
          instructorTeachings={instructorTeachings}
          assistantTeachings={taTeachings}
        />
      </I18nProviderClient>
    </>
  );
}
