"use server";

import { announcementsAPI } from "@/api";
import { getAccessToken } from "@/lib";
import { CreateAnnouncementFormValues } from "./CreateAnnouncementForm";
import { revalidatePath } from "next/cache";

export const createAnnouncement = async (
  data: CreateAnnouncementFormValues
) => {
  const accessToken = await getAccessToken();

  const requestBody = {
    announcement: {
      ...data,
      levels: data.levels !== "ALL" ? [parseInt(data.levels)] : undefined,
    },
  };

  const response = await announcementsAPI.post("/", requestBody, {
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

  revalidatePath("/announcements");

  return { success: true };
};
