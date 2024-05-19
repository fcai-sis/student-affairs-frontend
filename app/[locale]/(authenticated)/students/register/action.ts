"use server";

import { redirect } from "next/navigation";
import { UploadExcelFormState } from "./upload-excel/[currentStep]/UploadExcelForm";
import { getAccessToken } from "@/lib";

export default async function uploadFileAction(
  _: any,
  formData: FormData
): Promise<UploadExcelFormState> {
  const accessToken = await getAccessToken();
  const file = formData.get("file") as File;

  console.log(file);

  const body = new FormData();
  body.append("file", file);

  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/start`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    }
  );

  console.log("RESPONSE:", await response.json());

  if (response.status === 201) {
    redirect("/students/register/upload-excel/2");
  }

  return {
    error:
      "الملف الذي اخترته ليس ملف إكسل، من فضلك أدخل ملف إكسل صحيح (.xlsx أو .xls)",
  };
}
