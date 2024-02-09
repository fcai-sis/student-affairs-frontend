"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={`bg-blue-500 text-white font-semibold py-2 px-4 mr-2 rounded transition-all ${
        pending
          ? "opacity-50 cursor-not-allowed "
          : "hover:bg-blue-700 active:bg-blue-800"
      }`}
      aria-disabled={pending}
    >
      {pending ? "Adding..." : "Add"}
    </button>
  );
}
