"use server";

import { redirect } from "next/navigation";
import { UploadExcelFormState } from "./upload-excel/[currentStep]/UploadExcel";

export default async function uploadFileAction(_: any, formData: FormData): Promise<UploadExcelFormState> {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/start`, {
    method: "POST",
    body: formData,
  });

  if (response.status === 200) {
    return {}
  }

  return { error: "الملف الذي اخترته ليس ملف إكسل، من فضلك أدخل ملف إكسل صحيح (.xlsx أو .xls)" };
}
