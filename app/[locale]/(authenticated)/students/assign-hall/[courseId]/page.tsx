import { fetchLatestSemesterCourseEnrollments } from "../actions";

export default async function Page({
  params: { courseId },
}: {
  params: {
    courseId: string;
  };
}) {
  const enrollments = await fetchLatestSemesterCourseEnrollments({
    course: courseId,
  });
  if (!enrollments.success) {
    return (
      <>
        <h1>Enrollments</h1>
        <p>Failed to load enrollments</p>
      </>
    );
  }

  return (
    <>
      <h1>Enrollments</h1>
      <form>
        <ul>
          {enrollments.data.map((enrollment: any) => (
            <li key={enrollment.id}>
              <p>{enrollment.studentId}</p>
            </li>
          ))}
        </ul>
        <label>Select a range for the enrollments</label>
        <input type='number' /> min
        <input type='number' /> max
        <label>Select a hall</label>
        <input type='text' />

        <button type='submit'>Assign Halls</button>
      </form>
    </>
  );
}
