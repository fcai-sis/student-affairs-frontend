import { StudentCardMini } from "@/components/StudentCard";
import { fetchLatestSemesterCourseEnrollments } from "../actions";
import AssignHallForm from "./AssignHallForm";
import { getAccessToken, getCurrentPage, limit } from "@/lib";
import { revalidatePath } from "next/cache";
import { I18nProviderClient } from "@/locales/client";
import { getCurrentLocale } from "@/locales/server";
import Pagination from "@/components/Pagination";
import { dummyHalls } from "@/dummy/halls";
import { getHalls } from "@/queries";

export default async function Page({
  params: { courseId },
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: {
    page: string;
  };
}) {
  const page = getCurrentPage(searchParams);
  const locale = getCurrentLocale();
  const enrollmentsResponse = await fetchLatestSemesterCourseEnrollments(
    {
      courseId,
    },
    page
  );
  if (!enrollmentsResponse.success) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-4">Enrollments</h1>
        <p className="text-red-600">Failed to load enrollments</p>
      </>
    );
  }
  const enrollments = enrollmentsResponse.data.enrollments;
  const totalEnrollments = enrollmentsResponse.data.totalEnrollments;

  const { halls } = await getHalls();
  // // const halls = hallResponse.halls;
  // const halls = dummyHalls;

  return (
    <div className="flex flex-col items-center gap-6">
      <I18nProviderClient locale={locale}>
        <AssignHallForm course={courseId} halls={halls} />
      </I18nProviderClient>
      <div className="flex flex-col gap-4">
        {enrollments.map((enrollment: any) => (
          <div key={enrollment.id}>
            <StudentCardMini
              student={enrollment.student}
              enrollment={enrollment}
            />
          </div>
        ))}
      </div>
      <Pagination totalPages={totalEnrollments / limit} />
    </div>
  );
}
