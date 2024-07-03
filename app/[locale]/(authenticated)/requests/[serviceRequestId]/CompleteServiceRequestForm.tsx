"use client";

import { useForm } from "react-hook-form";

import { completeServiceRequest } from "./actions";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { useI18n } from "@/locales/client";

export default function CompleteServiceRequestForm({
  serviceRequestId,
}: {
  serviceRequestId: any;
}) {
  const t = useI18n();
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const response = await completeServiceRequest(serviceRequestId);

    if (!response.success) {
      console.error("Failed to complete service request");
      toast.error(t("serviceRequests.failedcomplete"));
      return;
    }

    toast.success(t("serviceRequests.completed"));
    router.refresh();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type='submit' className='btn' disabled={isSubmitting}>
          {t("serviceRequests.complete")}
        </button>
      </form>
    </>
  );
}
