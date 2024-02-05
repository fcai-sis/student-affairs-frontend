"use server";
import { redirect } from "next/navigation";

export default async function deleteStudent(formData: FormData) {
  const id = formData.get("_id");

  const res = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/delete/${id}`,
    {
      method: "DELETE",
    }
  );

  if (res.status === 200) {
    redirect("/students/read-students");
  } else {
    console.log("An error occured.");
  }
}
