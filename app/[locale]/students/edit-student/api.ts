import { TODO } from "../TODO";

export default async function fetchStudentData(id: string) {
  const response = await fetch(`http://127.0.0.1:3001/students/find/${id}`, {
    cache: "no-store",
    method: "GET",
  });

  const data = await response.json();

  return data.student;
}

export async function updateStudentApi(id: FormDataEntryValue, student: TODO) {
  console.log("UPDATING STUDENT DATA", student);

  const response = await fetch(`http://127.0.0.1:3001/students/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...student.data,
      studentId: undefined,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("UPDATED STUDENT DATA", data);

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
