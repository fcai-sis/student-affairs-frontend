"use server";
import { getAccessToken } from "@/lib";
import { PAGE_SIZE } from "../constants";
export async function readStudents(page: number) {
  const accessToken = await getAccessToken();
  const searchParams = new URLSearchParams({
    page: `${page}`,
    pageSize: `${PAGE_SIZE}`,
  });

  const response = await fetch(
    `http://127.0.0.1:3001/students/read?${searchParams}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
