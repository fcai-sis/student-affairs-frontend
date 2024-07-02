import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; status: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);

  const accessToken = await getAccessToken();
  const { data } = await serviceRequestsAPI.get("/", {
    params: {
      skip: page,
      limit,
      status: searchParams.status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { serviceRequests, totalServiceRequests } = data;

  const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"];

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>{t("serviceRequests.title")}</h1>
      <p className='flex items-center align-middle gap-2'>
        <b>Filter by status: </b>
        {statuses.map((status: string) => (
          <Link
            key={status}
            href={
              searchParams.status === status
                ? "/requests"
                : `/requests?status=${status}`
            }
            className={`${
              searchParams.status === status ? "bg-slate-500 text-white" : ""
            } flex justify-center w-min h-min rounded-full border hover:bg-slate-300 active:bg-slate-500 mr-2`}
          >
            {status}
          </Link>
        ))}
      </p>
      <div className='flex flex-col gap-4 mt-4'>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      {serviceRequests.length === 0 ? (
        <p>{t("serviceRequests.empty")}</p>
      ) : (
        <Pagination totalPages={totalServiceRequests / limit} />
      )}
    </>
  );
}
