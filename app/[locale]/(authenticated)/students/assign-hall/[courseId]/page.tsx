import { fetchLatestSemesterCourseEnrollments } from "../actions";
import AssignHallForm from "./AssignHallForm";

export default async function Page({
  params: { courseId },
}: {
  params: {
    courseId: string;
  };
}) {
  const enrollments = await fetchLatestSemesterCourseEnrollments({
    courseId,
  });
  if (!enrollments.success) {
    return (
      <>
        <h1>Enrollments</h1>
        <p>Failed to load enrollments</p>
      </>
    );
  }

  return <AssignHallForm enrollments={enrollments.data} course={courseId} />;
}
