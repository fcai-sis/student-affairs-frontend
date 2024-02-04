import { redirect } from "next/navigation";

import { Mapping } from "./table/page";

// TODO: Move to appropriate location
export type RegistrationSession = {
  active: boolean;
  mapping: Mapping;
  excelColumnsHeaders: string[];
  startDate: Date;
}

export async function readActiveRegistrationSession(): Promise<RegistrationSession | null> {
  const response = await fetch(`${process.env.STUDENT_REGISTRATION_API}/active`, { cache: 'no-store' });

  if (response.status === 200) {
    const { registrationSession } = await response.json();
    return registrationSession;
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
