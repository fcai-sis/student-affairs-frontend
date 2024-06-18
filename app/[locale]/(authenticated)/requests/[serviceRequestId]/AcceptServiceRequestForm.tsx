"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { acceptServiceRequest } from "./actions";

const acceptServiceRequestFormSchema = z.object({
  claimAt: z.date(),
});

export type AcceptServiceRequestFormValues = z.infer<
  typeof acceptServiceRequestFormSchema
>;

export default function AcceptServiceRequestForm({
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
  } = useForm<AcceptServiceRequestFormValues>();

  const onSubmit = async (data: AcceptServiceRequestFormValues) => {
    const response = await acceptServiceRequest(serviceRequestId, data.claimAt);

    if (!response.success) {
      console.error("Failed to accept service request");
      toast.error("Failed to accept service request");
      return;
    }

    toast.success("Service request accepted");
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
        Accept
      </button>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{ display: showForm ? "block" : "none" }}
      >
        <button className="btn" onClick={() => setShowForm(false)}>
          Close
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="claimAt">Claim Date</label>
          <input type="date" id="claimAt" {...register("claimAt")} />
          <button type="submit" className="btn" disabled={isSubmitting}>
            Accept
          </button>
        </form>
      </div>
    </>
  );
}
