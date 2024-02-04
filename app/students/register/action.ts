"use server";

import { redirect } from "next/navigation";

export default async function uploadFileAction(_: any, formData: FormData) {
  await fetch(`${process.env.STUDENT_REGISTRATION_API}/start`, {
    method: "POST",
    body: formData,
  });

  redirect("/table");
}
