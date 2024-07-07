import Pagination from "@/components/Pagination";
import { ServiceRequestStatusChip } from "@/components/ServiceRequestCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getCurrentPage, tt } from "@/lib";
import { SelectFilter } from "@/components/SetQueryFilter";
import {
  ServiceRequestStatusEnum,
  ServiceRequestStatusEnumType,
  serviceRequestStatusLocalizedFields,
} from "@fcai-sis/shared-models";
import { getServiceRequests } from "@/queries";
import { ButtonLink } from "@/components/Buttons";

const requestsLimit = 30;

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; status: string } }>) {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);

  const { data } = await getServiceRequests({
    page,
    limit: requestsLimit,
    status: searchParams.status,
  });

  const { serviceRequests, totalServiceRequests } = data;

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
      <h1 className="text-3xl font-bold mb-4">{t("serviceRequests.title")}</h1>
      <p className="flex items-center align-middle gap-2">
        <SelectFilter options={statusOptions} name="status" />
      </p>
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Service Name",
                  ar: "اسم الخدمة",
                })}
              </th>
              <th className="px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Student Name",
                  ar: "اسم الطالب",
                })}
              </th>
              <th className="px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Student ID",
                  ar: "رقم الطالب",
                })}
              </th>
              <th className="px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                {tt(locale, {
                  en: "Status",
                  ar: "الحالة",
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.map((request: any, index: number) => (
              <tr key={index}>
                <td className="px-2 py-3 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider w-4">
                  {index + 1}
                </td>
                <td className="px-6 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider w-[600px]">
                  {request.serviceName}
                </td>
                <td className="px-2 py-3 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider w-64">
                  {request.student.fullName}
                </td>
                <td className="px-2 py-3 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
                  {request.student.studentId}
                </td>
                <td className="px-2 py-3 flex gap-2 text-startleft text-xs font-medium text-slate-600 uppercase tracking-wider">
                  <ServiceRequestStatusChip status={request.status} />
                </td>
                <td className="px-2 py-3 text-start text-xs font-medium text-slate-600 uppercase tracking-wider">
                  <ButtonLink href={`/requests/${request._id}`}>
                    {tt(locale, {
                      en: "View Details",
                      ar: "عرض التفاصيل",
                    })}
                  </ButtonLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {serviceRequests.length === 0 ? (
        <p className="py-4">
          {tt(locale, {
            en: "No service requests found",
            ar: "لا توجد طلبات خدمة",
          })}
        </p>
      ) : (
        <Pagination totalPages={totalServiceRequests / requestsLimit} />
      )}
    </>
  );
}
