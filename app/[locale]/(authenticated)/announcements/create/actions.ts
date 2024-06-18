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
    ...data,
    academicLevel:
      data.academicLevel !== "all" ? parseInt(data.academicLevel) : undefined,
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
        message: response.data.error.message,
      },
    };
  }

  revalidatePath("/announcements");

  return { success: true };
};
