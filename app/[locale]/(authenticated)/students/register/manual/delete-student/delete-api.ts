"use server";
import { revalidatePath } from "next/cache";
import { TODO } from "../TODO";
import { getAccessToken } from "@/lib";

export default async function deleteStudent(id: string) {
  const accessToken = await getAccessToken();
  const res = await fetch(`http://127.0.0.1:3001/students/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
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
