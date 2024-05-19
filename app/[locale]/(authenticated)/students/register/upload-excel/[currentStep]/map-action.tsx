"use server";

import { getAccessToken } from "@/lib";
import { redirect } from "next/navigation";

// either validate here or on the client and then make the api call
export default async function validateMapping(_: any, formData: FormData) {
  const accessToken = await getAccessToken();
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("RAW FORM DATA: ", rawFormData);

  // remove Next.js $ACTION fields
  const cleanedFormData = Object.fromEntries(
    Object.entries(rawFormData).filter(([key, _]) => !key.includes("$ACTION"))
  );

  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/mapping`,
    {
      method: "PATCH",
      body: JSON.stringify({ mapping: cleanedFormData }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  console.log("MAPPING RES: ", data);

  if (response.status !== 200) {
    return { error: data.error };
  }

  // if any of the keys in data.mapping has value "<unset>" do not redirect and return error with list of unset fields
  const unsetFields = Object.entries(data.mapping).filter(
    ([_, value]) => value === "<unset>"
  );

  if (unsetFields.length > 0) {
    return {
      error: {
        fields: unsetFields.map(([key, _]) => key),
      },
    };
  }

  redirect("/students/register/upload-excel/3");
}
