"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { rejectServiceRequest } from "./actions";
import toast from "react-hot-toast";
import { useI18n } from "@/locales/client";
import { XmarkCircle } from "iconoir-react";

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
  const t = useI18n();
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
      console.error("Failed to reject service request");
      toast.error(t("serviceRequests.failedreject"));
      return;
    }

    toast.success(t("serviceRequests.rejected"));
    setShowForm(false);
    router.refresh();
  };

  return (
    <>
      <button
        className='btn-danger text-white py-2 px-4 rounded'
        onClick={() => {
          setShowForm(true);
        }}
      >
        {t("serviceRequests.reject")}
      </button>
      {showForm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <button
              className='mb-4 text-red-500'
              onClick={() => setShowForm(false)}
            >
              <XmarkCircle className='w-6 h-6' />
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <label
                  htmlFor='message'
                  className='block text-gray-700 font-medium mb-2'
                >
                  {t("serviceRequests.rejectionReason")}
                </label>
                <textarea
                  id='message'
                  {...register("message")}
                  className='w-full p-2 border border-gray-300 rounded resize-none'
                  rows={4}
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='btn-danger text-white py-2 px-4 rounded'
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("general.loading")
                    : t("serviceRequests.reject")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
