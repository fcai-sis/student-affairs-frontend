import { readActiveRegistrationSession } from "@/app/api";
import { redirect } from "next/navigation";

export async function ensureActiveRegistrationSession() {
  console.log("ensureActiveRegistrationSession");
  const readResponse = await readActiveRegistrationSession();

  if (!readResponse)
    return redirect("/students/register/upload-excel/1");

  return readResponse;
}

export async function ensureNoActiveRegistrationSession() {
  console.log("ensureNoActiveRegistrationSession");
  const readResponse = await readActiveRegistrationSession();

  if (readResponse)
    return redirect("/students/register/upload-excel/2");

  return readResponse;
}
