"use server";

import { announcementsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { CreateAnnouncementFormValues } from "./page";
import { revalidatePath } from "next/cache";

export const createAnnouncement = async (
  data: CreateAnnouncementFormValues
) => {
  const accessToken = await getAccessToken();

  const response = await announcementsAPI.post(
    "/",
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 201) {
    return {
      success: false,
      error: {
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/announcements");

  return { success: true };
};
