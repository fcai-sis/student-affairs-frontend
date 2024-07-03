import { serviceRequestsAPI } from "@/api";
import ServiceRequestCardImage from "@/components/ServiceRequestCardImage";
import { getAccessToken, tt } from "@/lib";
import AcceptServiceRequestForm from "./AcceptServiceRequestForm";
import RejectServiceRequestForm from "./RejectServiceRequestForm";
import CompleteServiceRequestForm from "./CompleteServiceRequestForm";
import { CreatedAt } from "@/components/CreatedAt";
import { getCurrentLocale, getI18n } from "@/locales/server";
import {
  ServiceRequestStatusEnumType,
  serviceRequestStatusLocalizedFields,
} from "@fcai-sis/shared-models";
import { I18nProviderClient } from "@/locales/client";

export default async function Page({
  params: { serviceRequestId },
}: {
  params: {
    serviceRequestId: string;
  };
}) {
  const locale = getCurrentLocale();
  const t = await getI18n();
  const accessToken = await getAccessToken();
  const getServiceRequestResponse = await serviceRequestsAPI.get(
    `/${serviceRequestId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (getServiceRequestResponse.status !== 200) {
    return (
      <>
        <h1>{t("serviceRequests.details")}</h1>
        <p>{t("serviceRequests.failedload")}</p>
      </>
    );
  }

  const { serviceRequest } = getServiceRequestResponse.data;

  return (
    <>
      <div className='flex flex-col items-center p-4'>
        <h1 className='text-3xl font-bold mb-4'>
          {t("serviceRequests.details")}
        </h1>
        <p className='flex justify-center gap-1 items-center text-lg mb-4 text-gray-700'>
          {t("serviceRequests.status")}:
          <b className='ml-2 text-slate-600'>
            {tt(
              locale,
              serviceRequestStatusLocalizedFields[
                serviceRequest.status as ServiceRequestStatusEnumType
              ]
            )}
          </b>
        </p>
        <div className='flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-xl'>
          <h2 className='text-2xl font-semibold mb-2'>
            {serviceRequest.serviceName}
          </h2>

          <p className='text-gray-700 mb-4'>
            {serviceRequest.message && (
              <span className='font-bold'>
                {t("serviceRequests.rejectionReason")}: {""}
              </span>
            )}
            {serviceRequest.message}
          </p>
          <p className='text-gray-700 mb-2'>
            <span className='font-bold'>
              {t("serviceRequests.studentName")}:
            </span>{" "}
            {serviceRequest.student.fullName}
          </p>
          <p className='text-gray-700 mb-4'>
            <span className='font-bold'>{t("serviceRequests.studentId")}:</span>{" "}
            {serviceRequest.student.studentId}
          </p>
          <ServiceRequestCardImage src={serviceRequest.image} />
          <CreatedAt date={serviceRequest.createdAt} />
        </div>
        {serviceRequest.status === "PENDING" && (
          <div className='flex gap-4 mt-4'>
            <I18nProviderClient locale={locale}>
              <AcceptServiceRequestForm serviceRequestId={serviceRequestId} />
              <RejectServiceRequestForm serviceRequestId={serviceRequestId} />
            </I18nProviderClient>
          </div>
        )}
        {serviceRequest.status === "IN_PROGRESS" && (
          <div className='mt-4'>
            <I18nProviderClient locale={locale}>
              <CompleteServiceRequestForm serviceRequestId={serviceRequestId} />
            </I18nProviderClient>
          </div>
        )}
      </div>
    </>
  );
}
