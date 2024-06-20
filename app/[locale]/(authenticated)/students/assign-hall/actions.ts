"use server";

import { enrollmentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { selectCourseEnrollmentsValues } from "./SelectCourseForm";
import { revalidatePath } from "next/cache";
import { updateHallAPIValues } from "./[courseId]/AssignHallForm";

export const fetchLatestSemesterCourseEnrollments = async (
  data: selectCourseEnrollmentsValues
) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/${data.courseId}`, {
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

export const assignHallAction = async (data: updateHallAPIValues) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    ...data,
  };

  const response = await enrollmentsAPI.patch(`/assign-hall`, requestBody, {
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
