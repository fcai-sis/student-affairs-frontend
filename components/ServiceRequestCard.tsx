import { getCurrentLocale } from "@/locales/server";
import { CreatedAt } from "./CreatedAt";
import ServiceRequestCardImage from "./ServiceRequestCardImage";
import Link from "next/link";
import {
  ServiceRequestStatusEnum,
  ServiceRequestStatusEnumType,
  serviceRequestStatusLocalizedFields,
} from "@fcai-sis/shared-models";
import { tt } from "@/lib";

export default async function ServiceRequestCard({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  const locale = getCurrentLocale();
  const colors =
    serviceRequest.status === ServiceRequestStatusEnum[0]
      ? "bg-yellow-100 text-yellow-500"
      : serviceRequest.status === ServiceRequestStatusEnum[1]
      ? "bg-blue-100 text-blue-500"
      : serviceRequest.status === ServiceRequestStatusEnum[2]
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  return (
    <div className={`border border-slate-200 w-full p-4 rounded-lg my-2`}>
      <div className='flex justify-end w-full'>
        <small
          className={`${colors} flex justify-start text-nowrap rounded-lg px-2 py-1 h-min w-min`}
        >
          {tt(
            locale,
            serviceRequestStatusLocalizedFields[
              serviceRequest.status as ServiceRequestStatusEnumType
            ]
          )}
        </small>
      </div>
      <div className='flex flex-col gap-2'>
        <h5>{serviceRequest.serviceName}</h5>

        <div>
          <p>{serviceRequest.student.fullName}</p>
          <p>{serviceRequest.student.studentId}</p>
        </div>
        <ServiceRequestCardImage src={serviceRequest.image} />
        <Link
          className='flex gap-2 w-min text-nowrap bg-blue-500 text-white font-bold hover:bg-blue-700 py-2 px-4 active:bg-blue-900'
          href={`/requests/${serviceRequest._id}`}
        >
          {tt(locale, {
            en: "View Details",
            ar: "عرض التفاصيل",
          })}
        </Link>
        <CreatedAt date={serviceRequest.createdAt} />
      </div>
    </div>
  );
}

export async function ServiceRequestCardMini({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  const locale = getCurrentLocale();
  const colors =
    serviceRequest.status === ServiceRequestStatusEnum[0]
      ? "bg-yellow-100 text-yellow-500"
      : serviceRequest.status === ServiceRequestStatusEnum[1]
      ? "bg-blue-100 text-blue-500"
      : serviceRequest.status === ServiceRequestStatusEnum[2]
      ? "bg-green-100 text-green-500"
      : "bg-red-100 text-red-500";
  return (
    <div className={`border border-slate-200 w-full p-4 rounded-lg my-2`}>
      <div className='flex justify-end w-full'>
        <small
          className={`${colors} flex justify-start text-nowrap rounded-lg px-2 py-1 h-min w-min`}
        >
          {tt(
            locale,
            serviceRequestStatusLocalizedFields[
              serviceRequest.status as ServiceRequestStatusEnumType
            ]
          )}
        </small>
      </div>
      <h3>{serviceRequest.serviceName}</h3>
      <p>{serviceRequest.student.fullName}</p>
      <p>{serviceRequest.student.studentId}</p>
      <div className='flex'>
        <Link
          className='flex gap-2 bg-blue-500 text-white font-bold hover:bg-blue-700 py-2 px-4 active:bg-blue-900'
          href={`/requests/${serviceRequest._id}`}
        >
          {tt(locale, {
            en: "View Details",
            ar: "عرض التفاصيل",
          })}
        </Link>
      </div>
      <CreatedAt date={serviceRequest.createdAt} />
    </div>
  );
}
