"use server";
import { revalidatePath } from "next/cache";
import { TODO } from "../TODO";

export default async function deleteStudent(id: string) {
  const res = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/delete/${id}`,
    {
      method: "DELETE",
    }
  );

  const data: TODO = await res.json();
  console.log(data);

  if (res.status === 200) {
    revalidatePath("/students/read-students");
    return data.data;
  } else {
    return { error: "Failed to delete student" };
  }
}
