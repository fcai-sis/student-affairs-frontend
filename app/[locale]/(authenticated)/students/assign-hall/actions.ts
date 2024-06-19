"use server";

import { enrollmentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { selectCourseEnrollmentsValues } from "./SelectSemesterForm";
import { revalidatePath } from "next/cache";

export const fetchLatestSemesterCourseEnrollments = async (
  data: selectCourseEnrollmentsValues
) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/${data}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/assign-hall");

  return { success: true, data: response.data.enrollments };
};
