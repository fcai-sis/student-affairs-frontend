"use server";

import { revalidatePath } from "next/cache";

export default async function confirmSessionAction(_: FormData) {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/commit`, {
    method: "POST",
  });

  console.log(response.status);
  console.log(JSON.stringify(await response.json()));

  if (response.status === 200) {
    revalidatePath("/table");
    return true;
  }

  return false;
}
