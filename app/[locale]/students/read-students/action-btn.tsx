"use client";
import { useFormStatus } from "react-dom";

export function AddBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type='button'
      className={`bg-teal-600 text-white font-semibold py-2 px-4 rounded transition-all hover:bg-blue-950 mt-4 ${
        pending
          ? "opacity-50 cursor-not-allowed "
          : "hover:bg-teal-700 active:bg-teal-800"
      }`}
    >
      {pending ? "Processing..." : "Add Student"}
    </button>
  );
}

export function EditBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type='button'
      className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-all ${
        pending
          ? "opacity-50 cursor-not-allowed "
          : "hover:bg-blue-600 active:bg-blue-800"
      }`}
    >
      {pending ? "Processing..." : "Edit"}
    </button>
  );
}

export function DeleteBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={`bg-red-500 text-white font-semibold py-2 px-4 rounded transition-all ${
        pending
          ? "opacity-50 cursor-not-allowed "
          : "hover:bg-red-600 active:bg-red-800"
      }`}
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
