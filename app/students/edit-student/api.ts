import { TODO } from "../TODO";

export default async function fetchStudentData(id: string) {
  const response = await fetch(`http://127.0.0.1:3000/students/find/${id}`);
  console.log(process.env.STUDENT_REGISTRATION_API);

  const data = await response.json();

  return data.student;
}

export async function updateStudentApi(
  id: FormDataEntryValue | null,
  student: TODO
) {
  const response = await fetch(`http://127.0.0.1:3000/students/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(student.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // Check if the response has an 'error' property
  if (data.error) {
    if (data.error.message) {
      console.error("Error:", data.error.message);
      return { error: data.error.message };
    }
    // Handle error case
    const { error } = data;
    console.error("Error:", error);
    return { error };
  } else {
    const { student } = data;
    return { student };
  }
}
