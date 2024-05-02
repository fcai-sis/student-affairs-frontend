import AnnouncementCard from "@/components/AnnouncementCard";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import TextInputField from "@/components/TextInputField";

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="w-full px-16">
      <h1>Global search</h1>
      <TextInputField placeholder="Search for anything" />

      <div>
        <h1>Service Requests</h1>
      </div>
      <div>
        <ServiceRequestCard />
        <ServiceRequestCard />
      </div>

      <div>
        <h1>Announcements</h1>
      </div>
      <div>
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  )
}
