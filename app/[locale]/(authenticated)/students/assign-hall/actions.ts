"use server";

import { enrollmentsAPI } from "@/api";
import { getAccessToken, limit } from "@/lib";
import { selectCourseEnrollmentsValues } from "./SelectCourseForm";
import { revalidatePath } from "next/cache";
import { assignHallValues } from "./[courseId]/AssignHallForm";

export const fetchLatestSemesterCourseEnrollments = async (
  data: selectCourseEnrollmentsValues,
  page?: number
) => {
  const accessToken = await getAccessToken();

  const response = await enrollmentsAPI.get(`/${data.courseId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      skip: page ? (page - 1) * limit : 0,
      limit: limit,
    },
  });

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

  revalidatePath("/assign-hall");

  return { success: true, data: response.data };
};

export const assignHallAction = async (data: assignHallValues) => {
  const accessToken = await getAccessToken();
  const requestBody = {
    ...data,
    minValue: parseInt(data.minValue),
    maxValue: parseInt(data.maxValue),
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
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  revalidatePath("/assign-hall");

  return { success: true, data: response.data.enrollments };
};
