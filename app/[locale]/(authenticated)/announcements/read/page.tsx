import Button from "@/components/Button";
import Announcements from "./Announcements";
import { fetchAnnouncements } from "./action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  const announcements = await fetchAnnouncements();

  if (!announcements) {
    return <div>Failed to fetch announcements</div>;
  }

  return (
    <>
      <div className='flex flex-col'>
        <Announcements data={announcements} />
        <Button asLink myHref='/announcements/create' variant='primary'>
          Create Announcement
        </Button>
      </div>
    </>
  );
}
