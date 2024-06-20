"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { rejectServiceRequest } from "./actions";
import toast from "react-hot-toast";

const rejectServiceRequestFormSchema = z.object({
  message: z.string(),
});

export type RejectServiceRequestFormValues = z.infer<
  typeof rejectServiceRequestFormSchema
>;

export default function RejectServiceRequestForm({
  serviceRequestId,
}: {
  serviceRequestId: any;
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<RejectServiceRequestFormValues>();

  const onSubmit = async (data: RejectServiceRequestFormValues) => {
    const response = await rejectServiceRequest(serviceRequestId, data.message);

    if (!response.success) {
      console.error("Failed to accept service request");
      toast.error("Failed to accept service request");
      return;
    }

    toast.success("Service request rejected");
    setShowForm(false);
    router.refresh();
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          setShowForm(true);
        }}
      >
        Reject
      </button>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{ display: showForm ? "block" : "none" }}
      >
        <button className="btn" onClick={() => setShowForm(false)}>
          Close
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="message">Reason</label>
          <textarea id="message" {...register("message")} />
          <button type="submit" className="btn" disabled={isSubmitting}>
            Reject
          </button>
        </form>
      </div>
    </>
  );
}
