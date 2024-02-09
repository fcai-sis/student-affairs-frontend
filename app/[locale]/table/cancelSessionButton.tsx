'use client';

import { useFormStatus } from "react-dom";

export default function CancelSessionButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>
    {pending ? "Cancelling..." : "Cancel"}
  </button>;
}
