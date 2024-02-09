"use server";
export async function readStudents(page: number) {
  const searchParams = new URLSearchParams({ page: `${page}`, pageSize: "5" });

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

  const studentData = await response.json();
  const studentNum = await countStudents();

  const students = studentData.students;
  const totalStudents = studentNum.count;

  if (response.status === 200) {
    return {
      students,
      totalStudents,
    };
  } else if (response.status == 400) {
    console.log("Error: 400");
  }

  return [];
}

export async function countStudents() {
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/count`,
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
    return data;
  } else if (response.status == 400) {
    console.log("Error: 400");
  }

  return 0;
}
