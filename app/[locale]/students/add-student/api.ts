import { TODO } from "../TODO";
export async function addStudent(student: TODO) {
  const response = await fetch(`http://127.0.0.1:3001/students/create`, {
    method: "POST",
    body: JSON.stringify(student.data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (response.status === 201) {
    return data.student;
  } else if (response.status === 400) {
    return {
      error: data.error,
    };
  }

  return {
    error: "An error occurred",
  };
}
