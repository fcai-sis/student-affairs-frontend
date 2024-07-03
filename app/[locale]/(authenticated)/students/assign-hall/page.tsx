import { getAccessToken } from "@/lib";
import SelectCourseForm from "./SelectCourseForm";
import { coursesAPI } from "@/api";
import { revalidatePath } from "next/cache";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";
export const getAllCourses = async () => {
  const accessToken = await getAccessToken();

  const response = await coursesAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch courses");

  revalidatePath("/assign-hall");

  return response.data;
};
export default async function Page() {
  const response = await getAllCourses();
  const courses = response.courses;
  const locale = getCurrentLocale();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <SelectCourseForm courses={courses} />
      </I18nProviderClient>
    </>
  );
}
