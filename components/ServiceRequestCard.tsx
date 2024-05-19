type ServiceRequestCardProps = {
  request: any;
};

export default function ServiceRequestCard({ request }: ServiceRequestCardProps) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h1>Service</h1>
      <div>
        <p>Request</p>
      </div>
    </div>
  );
}
