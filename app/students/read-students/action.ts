"use server";
import { PAGE_SIZE } from "../constants";
export async function readStudents(page: number) {
  const searchParams = new URLSearchParams({
    page: `${page}`,
    pageSize: `${PAGE_SIZE}`,
  });

  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/read?${searchParams}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const studentData = await response.json();

  const students = studentData.students;
  const totalStudents = studentData.count;
  console.log(totalStudents);

  if (response.status === 200) {
    return {
      students,
      totalStudents,
    };
  } else if (response.status == 400) {
    return studentData.error;
  }

  return {
    students: [],
    totalStudents,
  };
}
