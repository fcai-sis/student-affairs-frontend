import { H1 } from "@/components/H";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { readServiceRequests } from "./action";
import { PAGE_SIZE } from "@/app/[locale]/(authenticated)/students/manual-register/constants";
import Pagination from "./pagination";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function StudentRequests({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  let page = parseInt(searchParams.page, 10);
  if (!page || page < 1) page = 1;
  const requests = await readServiceRequests(page);

  const totalPages = requests.totalPages;

  return (
    <>
      <div className='flex flex-col min-w gap-2'>
        <H1>Service Requests</H1>
        <div className='flex flex-col gap-2'>
          {requests.studentServiceRequests.length === 0 && (
            <p>No service requests available</p>
          )}
          {requests.studentServiceRequests
            .filter((request: any) => request.status !== "rejected")
            .map((request: any, index: number) => (
              <ServiceRequestCard key={index} request={request} />
            ))}

          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
