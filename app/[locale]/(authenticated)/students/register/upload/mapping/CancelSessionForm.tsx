"use client";

import { useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { cancelRegistrationSession } from "./actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CancelSessionForm() {
  const router = useRouter();
  const t = useI18n();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const response = await cancelRegistrationSession();
    if (response.success) {
      toast.success(t("registerStudent.upload.mapping.success.cancel"));
      router.push("/students/register/upload");
    } else {
      console.error("Failed to cancel registration session");
      toast.error(t("registerStudent.upload.mapping.error.cancelFailed"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex justify-center gap-4'
    >
      <button className='btn-secondary' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t("general.loading") : t("general.cancel")}
      </button>
    </form>
  );
}
