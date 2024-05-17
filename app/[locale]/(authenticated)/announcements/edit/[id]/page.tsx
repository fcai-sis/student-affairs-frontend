import { usePathname } from "next/navigation";
import { useFormState } from "react-dom";
import updateAnnouncementAction, { fetchAnnouncement } from "../action";
import { useState } from "react";
import EditAnnouncementForm from "../EditAnnouncementForm";
export default async function EditAnnouncement() {
  const params = usePathname();
  const announcementToUpdate = await fetchAnnouncement(params.split("=")[1]);

  return <EditAnnouncementForm data={announcementToUpdate} />;
}
