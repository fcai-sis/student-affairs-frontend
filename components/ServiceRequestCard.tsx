import AcceptButtonModal from "./AcceptServiceRequestModal";
import Button from "./Button";
import RejectButtonModal from "./RejectServiceRequestModal";

export default function ServiceRequestCard({ request }: { request: any }) {
  return (
    <div className='bg-white shadow-md p-4 rounded-lg'>
      <div className='flex justify-between'>
        <div>
          <h2 className='text-lg font-bold'>{request.serviceName}</h2>
        </div>
        <div>
          <h3 className='text-lg font-bold'>{request.status}</h3>
        </div>
        <div>
          <h3 className='text-lg font-bold'>
            {request.studentId.studentId} - {request.studentId.fullName}
          </h3>
        </div>
        {request.message && <p>{request.message}</p>}

        <div>
          <img
            src={request.imgAttachment}
            alt='service request'
            className='w-20 h-20 rounded-md'
          />
        </div>
        <div>
          <AcceptButtonModal data={request._id} />
          <RejectButtonModal data={request._id} />
        </div>
      </div>
    </div>
  );
}
