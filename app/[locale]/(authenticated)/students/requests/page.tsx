import Button from "@/components/Button";
import { H1 } from "@/components/H";
import ServiceRequestCard from "@/components/ServiceRequestCard";

export default async function StudentRequests({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const name = locale === "en" ? "John" : "جون";

  return (
    <>
      <div className='flex flex-col min-w gap-2'>
        <div>
          <H1>Student Service Requests</H1>
        </div>
        <div className='flex flex-col w-1/2 gap-2'>
          <ServiceRequestCard />
          <ServiceRequestCard />
          <ServiceRequestCard />
          <ServiceRequestCard />
        </div>
      </div>
    </>
  );
}
