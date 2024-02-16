"use client";

import { useFormState } from "react-dom";
import { commitSession } from "./dummy-action";

export default function CommitForm() {
  const [state, formAction] = useFormState(commitSession, null);

  // assuming this works as intended, the state is only usable here, which isn't very useful so we'll need to probably turn "ReviewAndConfirm" to a client component
  return (
    <div>
      <form action={formAction}>
        <button type='submit'>Confirm</button>
      </form>
    </div>
  );
}
