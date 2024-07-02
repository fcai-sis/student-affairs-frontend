import { serviceRequestsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { SelectFilter } from "@/components/SetQueryFilter";
import {
  ServiceRequestStatusEnum,
  ServiceRequestStatusEnumType,
  serviceRequestStatusLocalizedFields,
} from "@fcai-sis/shared-models";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; status: string } }>) {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);

  const accessToken = await getAccessToken();
  const { data } = await serviceRequestsAPI.get("/", {
    params: {
      skip: page * limit - limit,
      limit,
      status: searchParams.status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { serviceRequests, totalServiceRequests } = data;

  const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"];

  const statusOptions = [
    {
      label: tt(locale, { en: "All", ar: "جميع الحالات" }),
      value: "",
    },
    ...ServiceRequestStatusEnum.map((status: ServiceRequestStatusEnumType) => ({
      label: tt(locale, serviceRequestStatusLocalizedFields[status]),
      value: status,
    })),
  ];

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>{t("serviceRequests.title")}</h1>
      <p className='flex items-center align-middle gap-2'>
        <SelectFilter options={statusOptions} name='status' />
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
