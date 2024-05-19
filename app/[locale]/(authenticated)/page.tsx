import AnnouncementCard from "@/components/AnnouncementCard";
import Button from "@/components/Button";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import TextInputField from "@/components/TextInputField";
import { ensureAuthenticated } from "@/lib";
import { readServiceRequests } from "./students/requests/action";

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  await ensureAuthenticated();
  const requests = await readServiceRequests(1);
  return (
    <div className='flex flex-col gap-4'>
      <h1>Global search</h1>
      <TextInputField placeholder='Search for anything' />

      <div>
        <h1>Recent Service Requests</h1>
        <Button asLink myHref='/students/requests' variant='secondary'>
          View all
        </Button>
      </div>
      <div>
        {requests.studentServiceRequests
          .filter((request: any) => request.status !== "rejected")
          .slice(0, 3)
          .map((request: any, index: number) => (
            <ServiceRequestCard key={index} request={request} />
          ))}
      </div>

      <div>
        <h1>Recent Announcements</h1>
        <Button asLink myHref='/announcements' variant='secondary'>
          View all
        </Button>
      </div>
      <div>
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  );
}
