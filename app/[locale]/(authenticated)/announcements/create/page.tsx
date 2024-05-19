import { getServerSession } from "next-auth";
import CreateAnnouncementForm from "./CreateAnnouncementForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  return <CreateAnnouncementForm />;
}
