import { TODO } from "../TODO";
export async function addStudent(student: TODO) {
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/create`,
    {
      method: "POST",
      body: JSON.stringify(student.data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

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
