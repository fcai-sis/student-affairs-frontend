import { redirect } from "next/navigation";


export type Mapping = {
  [key: string]: string,
};

export type RegistrationSession = {
  active: boolean;
  mapping: Mapping;
  excelColumnsHeaders: string[];
  startDate: Date;
}

type ReadActiveRegistrationSessionResponse = {
  registrationSession: RegistrationSession;
  arabicFields: { [key: string]: string };
} | null;

export async function readActiveRegistrationSession(): Promise<ReadActiveRegistrationSessionResponse> {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/active`, { cache: 'no-store' });

  if (response.status === 200) {
    const { registrationSession, arabicFields } = await response.json();
    return { registrationSession, arabicFields };
  }

  // TODO: Handle other status codes

  return null;
}

export async function cancelRegistrationSession(): Promise<boolean> {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/cancel`, { method: 'POST' });
  return response.status === 200;
}

export async function readMappedStudents(page: number) {
  const searchParams = new URLSearchParams({ page: `${page}`, pageSize: '10' });
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/active/mapped?${searchParams}`, { cache: 'no-store' });

  if (response.status === 200) {
    const { students } = await response.json();
    return students;
  } else if (response.status === 400) {
    redirect("/students/register/mapping");
  }

  return [];
}
