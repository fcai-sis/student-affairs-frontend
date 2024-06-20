import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage } from "@/lib";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; status: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);
  const limit = 5;

  const accessToken = await getAccessToken();
  const { data } = await serviceRequestsAPI.get("/", {
    params: {
      page,
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
      <h1>{t("serviceRequests.title")}</h1>
      <p>
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
              searchParams.status === status ? "bg-blue-600 text-white" : ""
            }`}
          >
            {status}
          </Link>
        ))}
      </p>
      <div>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      {serviceRequests.length === 0 ? (
        <p>{t("serviceRequests.empty")}</p>
      ) : (
        <Pagination
          route="/requests"
          currentPage={page}
          totalPages={totalServiceRequests / limit}
        />
      )}
    </>
  );
}
