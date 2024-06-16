"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useI18n } from "@/locales/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { startRegistrationSession } from "./actions";

const uploadExcelFormSchema = z.object({
  excelFile: z
    .unknown()
    .transform((value) => value as FileList)
    .refine(
      (file) =>
        file.length === 1 &&
        file[0].type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      {
        message: "Please upload an Excel file (.xlsx)",
      }
    ),
});

type UploadExcelFormValues = z.infer<typeof uploadExcelFormSchema>;

export default function UploadExcelForm() {
  const router = useRouter();
  const t = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UploadExcelFormValues>({
    resolver: zodResolver(uploadExcelFormSchema),
  });

  const onSubmit = async (values: UploadExcelFormValues) => {
    const formData = new FormData();
    formData.append("file", values.excelFile[0]);
    const result = await startRegistrationSession(formData);

    if (!result.success) {
      toast.error(t("general.error.somethingWentWrong"));
    }

    toast.success(t("registerStudent.upload.success"));
    router.push("/students/register/upload/mapping");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Excel File</span>
        <input {...register("excelFile")} type="file" />
      </label>
      {errors.excelFile && (
        <p className="text-red-600">{errors.excelFile.message}</p>
      )}
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("general.loading")
          : t("registerStudent.upload.uploadExcelFile")}
      </button>
    </form>
  );
}
