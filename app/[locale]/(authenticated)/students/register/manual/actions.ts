"use server";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { studentsAPI } from "@/api";
import { CreateStudentFormValues } from "./CreateStudentForm";
import { UpdateStudentFormValues } from "../../[studentId]/UpdateStudentForm";

export const createStudentAction = async (data: CreateStudentFormValues) => {
  const accessToken = await getAccessToken();

  const [birthYear, birthMonth, birthDay] = data.birthDate.split("-");
  const requestBody = {
    student: {
      ...data,
      birthDate: undefined,
      birthYear: parseInt(birthYear),
      birthMonth: parseInt(birthMonth),
      birthDay: parseInt(birthDay),
    },
  };
  console.log(requestBody);

  const response = await studentsAPI.post(`/`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data);

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/students");

  return { success: true };
};

export const updateStudentAction = async (
  studentId: string,
  data: UpdateStudentFormValues
) => {
  const accessToken = await getAccessToken();

  const [birthYear, birthMonth, birthDay] = data.birthDate?.split("-") ?? [];
  const requestBody = {
    ...data,
    birthDate: undefined,
    birthYear: parseInt(birthYear) ? parseInt(birthYear) : undefined,
    birthMonth: parseInt(birthMonth) ? parseInt(birthMonth) : undefined,
    birthDay: parseInt(birthDay) ? parseInt(birthDay) : undefined,
  };

  const response = await studentsAPI.patch(`/${studentId}`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data);

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/students");

  return { success: true };
};
