"use server";

import { studentRegistrationAPI } from "@/api";
import { getAccessToken } from "@/lib";

export async function startRegistrationSession(data: FormData) {
  const accessToken = await getAccessToken();

  const startRegistrationSessionResponse = await studentRegistrationAPI.post(
    "/start",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (startRegistrationSessionResponse.status !== 201) {
    return {
      success: false,
      error: {
        message: startRegistrationSessionResponse.data.message,
      },
    };
  }

  return { success: true, data: startRegistrationSessionResponse.data };
}
