import { ensureNoActiveRegistrationSession } from "../../../lib";
import UploadExcelForm from "./UploadExcelForm";

export default async function UploadExcel() {
  console.log("UPLOAD EXCEL inner");
  await ensureNoActiveRegistrationSession();

  return <UploadExcelForm />
}

