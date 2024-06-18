import { serviceRequestsAPI } from "@/api";
import ServiceRequestCardImage from "@/components/ServiceRequestCardImage";
import { getAccessToken } from "@/lib";
import AcceptServiceRequestForm from "./AcceptServiceRequestForm";
import RejectServiceRequestForm from "./RejectServiceRequestForm";
import CompleteServiceRequestForm from "./CompleteServiceRequestForm";
import { CreatedAt } from "@/components/CreatedAt";

export default async function Page({
  params: { serviceRequestId },
}: {
  params: {
    serviceRequestId: string;
  };
}) {
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
        <h1>Service Request Details</h1>
        <p>Failed to load service request</p>
      </>
    );
  }

  const { serviceRequest } = getServiceRequestResponse.data;

  return (
    <>
      <h1>Service Request Details</h1>
      <p>
        Status: <b>{serviceRequest.status}</b>
      </p>
      {serviceRequest.status === "PENDING" && (
        <>
          <AcceptServiceRequestForm serviceRequestId={serviceRequestId} />
          <RejectServiceRequestForm serviceRequestId={serviceRequestId} />
        </>
      )}
      {serviceRequest.status === "IN_PROGRESS" && (
        <CompleteServiceRequestForm serviceRequestId={serviceRequestId} />
      )}
      <div>
        <h2>{serviceRequest.serviceName}</h2>
        <p>{serviceRequest.message}</p>
        <p>{serviceRequest.student.fullName}</p>
        <p>{serviceRequest.student.studentId}</p>
        <ServiceRequestCardImage src={serviceRequest.image} />
        <CreatedAt date={serviceRequest.createdAt} />
      </div>
    </>
  );
}
