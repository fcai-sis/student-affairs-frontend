"use server";

import { revalidatePath } from "next/cache";
import { StudentSchema } from "../register/manual/lib/types";
import { addStudent } from "./api";
export async function createStudent(_: any, formData: FormData) {
  const birthDateValue = formData.get("birthDate") as string;
  // split the birth date value into year, month, and day
  const [birthYear, birthMonth, birthDay] = birthDateValue.split("-");

  const rawFormData = {
    fullName: formData.get("fullName") as string,
    studentId: formData.get("studentId") as string,
    groupCode: (formData.get("groupCode") as string) === "1",
    gender: formData.get("gender") as string,
    religion: formData.get("religion") as string,
    nationalId: formData.get("nationalId") as string,
    administration: formData.get("administration") as string,
    directorate: formData.get("directorate") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    educationType: formData.get("educationType") as string,
    birthYear: parseInt(birthYear),
    birthMonth: parseInt(birthMonth),
    birthDay: parseInt(birthDay),
    birthPlace: formData.get("birthPlace") as string,
    governorateId: parseInt(formData.get("governorateId") as string),
    nationality: formData.get("nationality") as string,
    address: formData.get("address") as string,
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

  console.log(parsedStudent.data);

  const response = await addStudent(parsedStudent);

  if (response.error) {
    return {
      error: response.error.message,
    };
  }

  // revalidatePath("/students/read-students");
  return response;
}
