"use server";
import { revalidatePath } from "next/cache";
import { TODO } from "../TODO";

export default async function deleteStudent(id: string) {
  const res = await fetch(`http://127.0.0.1:3001/students/delete/${id}`, {
    method: "DELETE",
  });

  const data: TODO = await res.json();
  console.log("DELETED STUDENT DATA", data);

  if (res.status === 200) {
    revalidatePath("/students/read-students");
    return data.data;
  } else {
    return { error: "Failed to delete student" };
  }
}
