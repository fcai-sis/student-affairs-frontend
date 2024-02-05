"use server";
export async function readStudents(page: number) {
  const searchParams = new URLSearchParams({ page: `${page}`, pageSize: "10" });

  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/read?${searchParams}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  const data = await response.json();

  if (response.status === 200) {
    return data.students;
  } else if (response.status == 400) {
    console.log("Error: 400");
  }

  return [];
}
