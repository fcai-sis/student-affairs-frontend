"use client";

import { useFormState, useFormStatus } from "react-dom";
import uploadFileAction from "./upload-excel/[currentStep]/(1)/action";

export default function StudentExcelFileUploadForm() {
  const [_, formAction] = useFormState(uploadFileAction, null);

  return (
    <div>
      <h1>Student Registration Page</h1>
      <form action={formAction}>
        <input type="file" name="file" />
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Submit"}
    </button>
  );
}
