"use server";

import { graduationAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { CreateGraduationFormValues } from "./CreateGraduationForm";

export const createGraduationTeamAction = async (
  data: CreateGraduationFormValues
) => {
  const accessToken = await getAccessToken();

  const requestBody = {
    enrollments: data.enrollments.map(
      (enrollment: any) => enrollment.enrollment
    ),
    instructorTeachings: data.instructorTeachings.map(
      (instructorTeaching: any) => instructorTeaching.instructorTeaching
    ),
    assistantTeachings: data.assistantTeachings.map(
      (assistantTeaching: any) => assistantTeaching.assistantTeaching
    ),
    semester: data.semester,
  };
  //   console.log(requestBody);

  const response = await graduationAPI.post(`/create`, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

  revalidatePath("/graduation");

  return { success: true };
};
