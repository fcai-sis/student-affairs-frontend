import { CreatedAt } from "./CreatedAt";
import ServiceRequestCardImage from "./ServiceRequestCardImage";
import Link from "next/link";

export default async function ServiceRequestCard({
  serviceRequest,
}: {
  serviceRequest: any;
}) {
  return (
    <div className={`border border-black w-64 p-4`}>
      <h3>{serviceRequest.serviceName}</h3>
      <p>{serviceRequest.message}</p>
      <p>
        Status: <b>{serviceRequest.status}</b>
      </p>
      <p>{serviceRequest.student.fullName}</p>
      <p>{serviceRequest.student.studentId}</p>
      <ServiceRequestCardImage src={serviceRequest.image} />
      <Link href={`/requests/${serviceRequest._id}`}>View details</Link>
      <CreatedAt date={serviceRequest.createdAt} />
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
