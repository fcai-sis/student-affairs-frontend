import { getAccessToken } from "@/lib";

export type Mapping = {
  [key: string]: string;
};

export type RegistrationSession = {
  active: boolean;
  mapping: Mapping;
  excelColumnsHeaders: string[];
  startDate: Date;
};

type ReadActiveRegistrationSessionResponse = {
  registrationSession: RegistrationSession;
  arabicFields: { [key: string]: string };
} | null;

export async function readActiveRegistrationSession(): Promise<ReadActiveRegistrationSessionResponse> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/active`,
    { cache: "no-store", headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (response.status === 200) {
    const { registrationSession, arabicFields } = await response.json();
    return { registrationSession, arabicFields };
  }

  // TODO: Handle other status codes

  return null;
}

export async function readActiveRegistrationSessionMappedStudents(): Promise<boolean> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/active/mapped?page=1&pageSize=1`,
    { cache: "no-store", headers: { Authorization: `Bearer ${accessToken}` } }
  );

  console.log(`response: ${response.status}`);

  if (response.status === 200) {
    const data = await response.json();
    console.log('data: ', data);
    const mappedStudents = data.mappedStudents;
    console.log("mappedStudents", mappedStudents);
    return mappedStudents.length > 0;
  }

  return false;
}

