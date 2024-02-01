"use client";

import { useSetAtom } from "jotai";
import uploadFileAction from "./action";
import { useFormState } from "react-dom";
import registrationSessionAtom from "./registrationSessionAtom";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'


export default function StudentRegistrationPage() {
  // TODO: check if active registration session exists, if so, redirect to table page
  const setRegistrationSession = useSetAtom(registrationSessionAtom);
  const [state, formAction] = useFormState(uploadFileAction, null); // TODO: type the regisration session
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (!state.registrationSession) return;
    const { registrationSession } = state;
    setRegistrationSession({
      mapping: registrationSession.mapping,
      startDate: registrationSession.startDate,
      excelColumnsHeaders: registrationSession.excelColumnsHeaders,
      stagedStudents: []
    });

    router.push("/table");
  }, [state]);

  return (
    <div>
      <h1>Student Registration Page</h1>
      <form action={formAction}>
        <input type="file" name="file" />
        <button>
          Upload
        </button>
      </form>
    </div>
  );
}
