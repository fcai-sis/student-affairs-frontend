"use server";

import { redirect } from "next/navigation";

export default async function cancelSessionAction(_: FormData) {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/session/cancel`, {
    method: "POST",
  });

  if (response.status === 200) {
    redirect("/students/register/upload-excel/1");
  }
}
