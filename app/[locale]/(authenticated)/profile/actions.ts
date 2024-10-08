"use server";

import { profileAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { revalidatePath } from "next/cache";
import { updateProfileValues } from "./ProfileDisplay";

export const getProfileAction = async () => {
  const accessToken = await getAccessToken();

  const response = await profileAPI.get(`/employee-profile`, {
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

  revalidatePath("/profile");

  return { success: true, data: response.data.profile };
};

export const updateProfileAction = async (data: updateProfileValues) => {
  const accessToken = await getAccessToken();

  const requestBody = {
    employee: {
      ...data,
    },
  };
  console.log(data);

  const response = await profileAPI.patch(`/employee-profile`, requestBody, {
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

  revalidatePath("/profile");

  return { success: true };
};
