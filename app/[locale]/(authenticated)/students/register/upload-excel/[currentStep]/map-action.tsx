"use server";

import { redirect } from "next/navigation";
import { mappingSchema } from "./types";

// either validate here or on the client and then make the api call
export default async function validateMapping(_: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  console.log(rawFormData);
  // check if any of the fields are empty or have the value '<unset>'
  const mapping = mappingSchema.safeParse(rawFormData);

  if (!mapping.success) {
    console.log(mapping.success);

    return null;
  }

  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/mapping`,
    {
      method: "PATCH",
      body: JSON.stringify({ mapping: mapping.data }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (response.status === 200) {
    redirect("/students/register/upload-excel/3");
  }
  return null;
}
