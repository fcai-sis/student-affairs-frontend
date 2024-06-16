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
      console.error(precommitResponse.error?.issues);
      setErrors(precommitResponse.error?.issues ?? []);
      toast.error(t("registerStudent.upload.commit.error.commitFailed"));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t("general.loading")
            : t("registerStudent.upload.commit.title")}
        </button>
      </form>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center"
        style={{ display: errors.length > 0 ? "block" : "none" }}
      >
        <div className="bg-white">
          <button className="btn" onClick={() => setErrors([])}>
            {t("general.ok")}
          </button>
          <p>{t("registerStudent.upload.commit.error.commitFailed")}</p>
          <div className="h-[50vh] overflow-y-auto">
            {errors?.map(({ row, errors }) => (
              <div key={row}>
                <p>
                  {t("registerStudent.upload.commit.error.row", {
                    rowNumber: row,
                  })}
                </p>
                <ul>
                  {errors.map((error) => (
                    <li className="text-red-600" key={error}>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
