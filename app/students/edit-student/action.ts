"use server";
import { revalidatePath } from "next/cache";
import { StudentSchema } from "../lib/types";
import { updateStudentApi } from "./api";

export async function updateStudent(_: any, formData: FormData) {
  const rawFormData = {
    fullName: formData.get("student-name"),
    status: formData.get("student-status"),
    address: formData.get("student-address"),
    _id: formData.get("_id"),
  };

  const parsedStudent = StudentSchema.safeParse(rawFormData);

  if (parsedStudent.success === false) {
    let errorMessage = "";
    parsedStudent.error.issues.forEach((issue) => {
      errorMessage += issue.path[0] + ": " + issue.message + "\n";
    });

    return {
      error: errorMessage,
    };
  }
  const response = await updateStudentApi(rawFormData._id, parsedStudent);
  revalidatePath("/students/read-students");
  return response;
}
