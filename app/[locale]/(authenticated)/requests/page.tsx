import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage } from "@/lib";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; status: string } }>) {
  const t = await getI18n();

  const page = getCurrentPage(searchParams);
  const pageSize = 5;

  const accessToken = await getAccessToken();
  const { data } = await serviceRequestsAPI.get("/", {
    params: {
      page,
      pageSize,
      status: searchParams.status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { serviceRequests, totalServiceRequests } = data;

  return (
    <>
      <h1>{t("serviceRequests.title")}</h1>
      <div>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCard key={i} serviceRequest={serviceRequest} />
        ))}
      </div>
      <Pagination
        route="/requests"
        currentPage={page}
        totalPages={totalServiceRequests / pageSize}
      />
    </>
  );
}
