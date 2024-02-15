import { readActiveRegistrationSession } from "@/app/api";
import { redirect } from "next/navigation";
import MappingForm from "./MappingForm";

export default async function Mapping() {
  const readResponse = await readActiveRegistrationSession();

  if (!readResponse)
    return redirect("/students/register/upload-excel/1");

  const { registrationSession, arabicFields } = readResponse;

  return (
    <MappingForm
      headers={registrationSession.excelColumnsHeaders}
      mapping={registrationSession.mapping}
      arabicFields={arabicFields}
    />
  );
}
