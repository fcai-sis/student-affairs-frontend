"use client";

import { useAtomValue } from "jotai";
import registrationSessionAtom from "../students/register/registrationSessionAtom";

export default function TablePage() {
  const registrationSession = useAtomValue(registrationSessionAtom);

  return (
    <div>
      <h1>Table Page</h1>
      <p>Mapping: {JSON.stringify(registrationSession.mapping)}</p>
    </div>
  );
}
