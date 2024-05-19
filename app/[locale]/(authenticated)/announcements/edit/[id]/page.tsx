import { getServerSession } from "next-auth";
import { fetchAnnouncement } from "../action";

import EditAnnouncementForm from "../EditAnnouncementForm";
import { redirect } from "next/navigation";
export default async function EditAnnouncement({ params }: { params: any }) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  console.log(params);

  const announcementToUpdate = await fetchAnnouncement(params.id);

  return <EditAnnouncementForm data={announcementToUpdate} />;
}
