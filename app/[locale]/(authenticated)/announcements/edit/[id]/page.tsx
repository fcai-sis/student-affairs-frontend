import { usePathname } from "next/navigation";
import { useFormState } from "react-dom";
import updateAnnouncementAction, { fetchAnnouncement } from "./action";

export default async function EditAnnouncement({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const name = locale === "en" ? "John" : "جون";

  const [state, formAction] = useFormState(updateAnnouncementAction, null);
  const params = usePathname();
  const announcement = await fetchAnnouncement(params.split("=")[1]);

  return (
    <div>
      <h1>Edit Announcement</h1>
    </div>
  );
}
