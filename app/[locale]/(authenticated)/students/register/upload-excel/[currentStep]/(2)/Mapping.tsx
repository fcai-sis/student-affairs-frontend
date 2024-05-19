import { ensureActiveRegistrationSession } from "../../../lib";
import MappingForm from "./MappingForm";

export default async function Mapping() {
  console.log("MAPPING inner");
  const { registrationSession, arabicFields } = await ensureActiveRegistrationSession();

  return (
    <MappingForm
      headers={registrationSession.excelColumnsHeaders}
      mapping={registrationSession.mapping}
      arabicFields={arabicFields}
    />
  );
}
