"use server";

import { revalidatePath } from "next/cache";

export default async function cancelSessionAction(_: FormData) {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/cancel`, {
    method: "POST",
  });

  if (response.status === 200) {
    revalidatePath("/table");
    return true;
  }

  return false;
}
