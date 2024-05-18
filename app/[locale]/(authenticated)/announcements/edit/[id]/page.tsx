import { fetchAnnouncement } from "../action";

import EditAnnouncementForm from "../EditAnnouncementForm";
export default async function EditAnnouncement({ params }: { params: any }) {
  console.log(params);

  const announcementToUpdate = await fetchAnnouncement(params.id);

  return <EditAnnouncementForm data={announcementToUpdate} />;
}
