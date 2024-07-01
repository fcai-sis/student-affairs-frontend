import { studentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import UpdateStudentForm from "./UpdateStudentForm";

const getStudent = async (studentId: string) => {
  const accessToken = await getAccessToken();

  const response = await studentsAPI.get(`/${studentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch student");

  revalidatePath("/students");

  return response.data;
};

export default async function Page({
  params: { studentId },
}: Readonly<{ params: { locale: string; studentId: string } }>) {
  const response = await getStudent(studentId);
  const student = response.student
  

  return (
    <>
      <h1>Student details</h1>
      <UpdateStudentForm student={student} />
    </>
  );
}
