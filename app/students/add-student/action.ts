"use server";

import { revalidatePath } from "next/cache";
import { StudentSchema } from "../lib/types";
import { addStudent } from "./api";
export async function createStudent(_: any, formData: FormData) {
  const rawFormData = {
    fullName: formData.get("student-name"),
    status: formData.get("student-status"),
    address: formData.get("student-address"),
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
  const response = await addStudent(parsedStudent);
  revalidatePath("/students/read-students");
  return response;
}
