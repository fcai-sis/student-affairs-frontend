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
      level: data.level !== "ALL" ? parseInt(data.level) : undefined,
    },
  };

  const response = await announcementsAPI.post("/", requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 201) {
    return response.data.errors;
  }

  revalidatePath("/announcements");

  return { success: true };
};
