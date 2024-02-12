import { readActiveRegistrationSession } from "@/app/api";
import MapForm from "./MapForm";

export default async function Mapping() {
  const activeRegistrationSession = await readActiveRegistrationSession();
  if (!activeRegistrationSession)
    return <div>No active registration session</div>;

  return (
    <div>
      <h1>
        <MapForm Headers={activeRegistrationSession.excelColumnsHeaders} Mapping={activeRegistrationSession.mapping}/>
      </h1>
    </div>
  );
}
