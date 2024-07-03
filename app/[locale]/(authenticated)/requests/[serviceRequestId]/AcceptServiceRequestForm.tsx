"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { acceptServiceRequest } from "./actions";
import { useI18n } from "@/locales/client";
import { XmarkCircle } from "iconoir-react";

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
  const t = useI18n();
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
      toast.error(t("serviceRequests.failedaccept"));
      return;
    }

    toast.success(t("serviceRequests.accepted"));
    setShowForm(false);
    router.refresh();
  };

  return (
    <>
      <button
        className='btn text-white py-2 px-4 rounded'
        onClick={() => {
          setShowForm(true);
        }}
      >
        {t("serviceRequests.accept")}
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
                  htmlFor='claimAt'
                  className='block text-gray-700 font-medium mb-2'
                >
                  {t("serviceRequests.claimAt")}
                </label>
                <input
                  type='date'
                  id='claimAt'
                  {...register("claimAt")}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='btn text-white py-2 px-4 rounded'
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("general.loading")
                    : t("serviceRequests.accept")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
