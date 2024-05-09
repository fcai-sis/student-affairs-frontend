import Button from "@/components/Button";
import { H1 } from "@/components/H";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { readServiceRequests } from "./action";

export default async function StudentRequests() {
  const requests = await readServiceRequests();
  console.log("Requests", requests.studentServiceRequests);
  console.log("Current Page", requests.currentPage);
  console.log("Page Size", requests.pageSize);

  return (
    <>
      <div className='flex flex-col min-w gap-2'>
        <H1>Service Requests</H1>
        <div className='flex flex-col gap-2'>
          {requests.studentServiceRequests.map(
            (request: any, index: number) => (
              <ServiceRequestCard key={index} request={request} />
            )
          )}
        </div>
      </div>
    </>
  );
}
