"use client";

import { useCurrentLocale, useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { commitSession, precommitSession } from "./actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { tt } from "@/lib";

export default function CommitSessionForm() {
  const locale = useCurrentLocale();
  const router = useRouter();
  const t = useI18n();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [errors, setErrors] = useState<any>([]);

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
      console.log(precommitResponse);

      setErrors(precommitResponse.error?.errors ?? []);
      toast.error(t("registerStudent.upload.commit.error.commitFailed"));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center gap-4"
      >
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t("general.loading")
            : t("registerStudent.upload.commit.title")}
        </button>
      </form>
      {errors.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-red-600 mb-4">
              {t("registerStudent.upload.commit.error.commitFailed")}
            </p>
            <div className="h-[50vh] overflow-y-auto">
              {errors?.map((error: any, index: number) => (
                <ErrorItem key={index} error={error} />
              ))}
            </div>
            <div className="flex justify-center">
              <button className="btn mt-4" onClick={() => setErrors([])}>
                {tt(locale, {
                  en: "Close",
                  ar: "إغلاق",
                })}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ErrorItem({ error }: { error: any }) {
  if (error.code === "unset-fields-in-mapping") {
    return (
      <div className="bg-red-100 p-4 rounded-lg mb-4">
        <p className="text-red-600">{error.message}</p>
        <ul className="list-disc pl-4">
          {error.unsetFields.map((field: string, index: number) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>
    );
  } else if (error.row) {
    // loop over error.errors
    return (
      <div className="table bg-red-100 p-4 rounded-lg mb-4">
        <h6 className="text-red-600">
          {tt(useCurrentLocale(), {
            en: "Row",
            ar: "الصف",
          })}{" "}
          {error.row}
        </h6>
        {Object.keys(error.data).map((key, index) => (
          <div key={index}>
            <span className="font-bold">{key}: </span>
            <span>{error.data[key]}</span>
          </div>
        ))}
        <h6 className="text-red-600">
          {tt(useCurrentLocale(), {
            en: "Errors",
            ar: "الأخطاء",
          })}
        </h6>
        {Object.keys(error.errors).map((key, index) => (
          <div key={index}>{error.errors[key]}</div>
        ))}
      </div>
    );
  }
}
