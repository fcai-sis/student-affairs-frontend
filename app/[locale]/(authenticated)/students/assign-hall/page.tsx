import SelectCourseForm from "./SelectCourseForm";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";
import { getAllCourses } from "@/queries";

export default async function Page() {
  const { courses } = await getAllCourses();
  const locale = getCurrentLocale();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <SelectCourseForm courses={courses} />
      </I18nProviderClient>
    </>
  );
}
