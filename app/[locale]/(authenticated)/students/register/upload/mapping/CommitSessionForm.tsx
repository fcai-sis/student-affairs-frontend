"use client";

import { useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { commitSession, precommitSession } from "./actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function CommitSessionForm() {
  const router = useRouter();
  const t = useI18n();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [errors, setErrors] = useState<{ row: number; errors: string[] }[]>([]);

  const onSubmit = async () => {
    const precommitResponse = await precommitSession();
    if (precommitResponse.success) {
      const commitResponse = await commitSession();
      if (commitResponse.success) {
        toast.success(t("registerStudent.upload.commit.success"));
        router.push("/students");
      } else {
        toast.error(t("registerStudent.upload.commit.error.commitFailed"));
      }
    } else {
      setErrors(precommitResponse.error?.errors ?? []);
      toast.error(t("registerStudent.upload.commit.error.commitFailed"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex justify-center gap-4'
      >
        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting
            ? t("general.loading")
            : t("registerStudent.upload.commit.title")}
        </button>
      </form>
      {errors.length > 0 && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto'>
            <div className='flex justify-center'>
              <button className='btn mb-4' onClick={() => setErrors([])}>
                {t("general.ok")}
              </button>
            </div>
            <p className='text-red-600 mb-4'>
              {t("registerStudent.upload.commit.error.commitFailed")}
            </p>
            <div className='h-[50vh] overflow-y-auto'>
              {errors?.map(({ row, errors }) => (
                <div key={row} className='mb-4'>
                  <p className='font-bold'>
                    {t("registerStudent.upload.commit.error.row", {
                      rowNumber: row,
                    })}
                  </p>
                  <ul className='list-disc list-inside ml-4'>
                    {errors.map((error) => (
                      <li className='text-red-600' key={error}>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
