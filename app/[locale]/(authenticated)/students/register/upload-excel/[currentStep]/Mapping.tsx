import { readActiveRegistrationSession } from "@/app/api";
import MapForm from "./mapForm";

export default async function Mapping() {
  const activeRegistrationSession = await readActiveRegistrationSession();
  if (!activeRegistrationSession)
    return <div>No active registration session</div>;

  return (
    <div>
      <MapForm
        headers={activeRegistrationSession.excelColumnsHeaders}
        mapping={activeRegistrationSession.mapping}
      />
    </div>
  );
}
