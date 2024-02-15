import { readActiveRegistrationSession } from "@/app/api";
import UploadExcelForm from "./UploadExcelForm";
import { redirect } from "next/navigation";

export default async function UploadExcel() {
  const readResponse = await readActiveRegistrationSession();

  if (readResponse)
    return redirect("/students/register/upload-excel/2");

  return <UploadExcelForm />
}
