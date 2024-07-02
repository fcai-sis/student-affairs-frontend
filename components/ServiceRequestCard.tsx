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
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <small
              className={`${colors} flex justify-center rounded-lg px-2 py-1 h-min`}
            >
              {tt(
                locale,
                serviceRequestStatusLocalizedFields[
                  serviceRequest.status as ServiceRequestStatusEnumType
                ]
              )}
            </small>
            {/* <p className='text-xl'>
              {tt(locale, {
                en: "Service Request",
                ar: "طلب خدمة",
              })}
            </p> */}
            <h5 className=''>{serviceRequest.serviceName}</h5>
            {/* <p className='text-xl'>
              {tt(locale, {
                en: "Requested by",
                ar: "طلب بواسطة",
              })}
            </p> */}
            <div className=''>
              <p>{serviceRequest.student.fullName}</p>
              <p>{serviceRequest.student.studentId}</p>
            </div>
            <ServiceRequestCardImage src={serviceRequest.image} />
            <Link href={`/requests/${serviceRequest._id}`}>View details</Link>
            <CreatedAt date={serviceRequest.createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function ServiceRequestCardMini({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  return (
    <div className={`border border-black w-64 p-4`}>
      <h3>{serviceRequest.serviceName}</h3>
      <p>
        Status: <b>{serviceRequest.status}</b>
      </p>
      <p>{serviceRequest.student.fullName}</p>
      <p>{serviceRequest.student.studentId}</p>
      <Link href={`/requests/${serviceRequest._id}`}>View details</Link>
      <CreatedAt date={serviceRequest.createdAt} />
    </div>
  );
}
