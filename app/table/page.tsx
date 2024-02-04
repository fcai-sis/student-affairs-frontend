import Link from "next/link";
import { redirect } from "next/navigation";

import cancelFormAction from "./cancelAction";
import confirmFormAction from "./confirmAction";
import CancelSessionButton from "./cancelSessionButton";
import ConfirmSessionButton from "./confirmSessionButton";
import { readActiveRegistrationSession, readMappedStudents } from "../api";

// TODO: Move to appropriate location
export type Mapping = {
  [key: string]: string,
};

export default async function Page() {
  const activeRegistrationSession = await readActiveRegistrationSession();

  if (!activeRegistrationSession) {
    return redirect("/students/register");
  }

  const stagedStudents = await readMappedStudents(1);

  return (
    <>
      <div className="table">
        <div className="table-row">
          {
            Object.keys(activeRegistrationSession.mapping).map((column) => (
              <div key={column} className="table-cell p-2 bg-gray-100">
                {column}
              </div>
            ))
          }
        </div>
        {
          stagedStudents.map((student: any, index: number) => (
            <div key={index} className="table-row">
              {
                Object.keys(activeRegistrationSession.mapping).map((column) => (
                  <div key={column} className="table-cell p-2 bg-gray-50">
                    {student[column]}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>

      <Link href="/students/register/mapping">
        Update mapping
      </Link>

      <form action={cancelFormAction}>
        <CancelSessionButton />
      </form>

      <form action={confirmFormAction}>
        <ConfirmSessionButton />
      </form>
    </>
  );
}
