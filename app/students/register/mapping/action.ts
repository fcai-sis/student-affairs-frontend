"use server";

import { redirect } from "next/navigation";

export default async function updateMappingAction(formData: FormData) {
  const mapping = Object.fromEntries(formData.entries());

  // remove all fields that are empty
  for (const key in mapping) {
    if (mapping[key] === "") {
      delete mapping[key];
    }
  }

  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/mapping`, {
    method: "PATCH",
    body: JSON.stringify({ mapping }),
    headers: {
      "Content-type": "application/json"
    },
  });

  console.log(JSON.stringify(await response.json()));

  redirect("/table");
}
