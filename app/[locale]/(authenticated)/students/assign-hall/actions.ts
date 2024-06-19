"use server";

import { enrollmentsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { selectSemesterEnrollmentsValues } from "./SelectSemesterForm";
import { revalidatePath } from "next/cache";

export const fetchSemesterEnrollments = async (
  data: selectSemesterEnrollmentsValues
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

  return { success: true };
};
