"use client";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

export function CancelButton() {
  const router = useRouter();
  const { pending } = useFormStatus();

  return (
    <button
      type='button'
      className={`bg-gray-500 text-white font-semibold py-2 px-4 rounded transition-all ${
        pending
          ? "opacity-50 cursor-not-allowed "
          : "hover:bg-gray-700 active:bg-gray-800"
      }`}
      aria-disabled={pending}
      onClick={() => {
        router.push("/students/read-students");
      }}
    >
      {pending ? "Cancelling..." : "Cancel"}
    </button>
  );
}
