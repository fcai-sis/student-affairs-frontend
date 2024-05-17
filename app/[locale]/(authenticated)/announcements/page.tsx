import AnnouncementCard from "@/components/AnnouncementCard";
import { H1 } from "@/components/H";

export default async function Announcements({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const name = locale === "en" ? "John" : "جون";

  return (
    <>
      <div className='flex flex-col min-w gap-2'>
        <div>
          <H1>Announcements</H1>
        </div>
        <div className='flex flex-col w-1/2 gap-2'>
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
      </div>
    </>
  );
}
