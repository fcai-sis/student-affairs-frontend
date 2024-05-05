import Button from "@/components/Button";
import Announcements from "./Announcements";
import { fetchAnnouncements } from "./action";

export default async function Page() {
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
