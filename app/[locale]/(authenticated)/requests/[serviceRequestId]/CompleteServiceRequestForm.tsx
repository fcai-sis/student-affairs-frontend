"use client";

import { useForm } from "react-hook-form";

import { completeServiceRequest } from "./actions";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export default function CompleteServiceRequestForm({
  serviceRequestId,
}: {
  serviceRequestId: any;
}) {
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const response = await completeServiceRequest(serviceRequestId);

    if (!response.success) {
      console.error("Failed to complete service request");
      toast.error("Failed to complete service request");
      return;
    }

    toast.success("Service request completed");
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="btn" disabled={isSubmitting}>
          Complete
        </button>
      </form>
    </>
  );
}
