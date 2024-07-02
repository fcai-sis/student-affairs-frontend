"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { createAnnouncement } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { tt } from "@/lib";
import { departmentLocalizedFields } from "@fcai-sis/shared-models";

const createAnnouncementFormSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  severity: z.enum(["INFO", "WARNING", "DANGER"]),
  levels: z.string().refine((value) => {
    return ["ALL", "1", "2", "3", "4"].includes(value);
  }),
  departments: z.array(z.string()),
});

type Department = {
  _id: string | number | readonly string[] | undefined;
  code: string;
  name: {
    en: string;
    ar: string;
  };
};

export type CreateAnnouncementFormValues = z.infer<
  typeof createAnnouncementFormSchema
>;

type CreateAnnouncementFormProps = {
  departments: Department[];
};

export default function CreateAnnouncementForm({
  departments,
}: CreateAnnouncementFormProps) {
  const locale = useCurrentLocale();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateAnnouncementFormValues>({
    resolver: zodResolver(createAnnouncementFormSchema),
    defaultValues: {
      title: "",
      content: "",
      severity: "INFO",
      levels: "ALL",
      departments: [],
    },
  });

  const t = useI18n();

  const onSubmit = async (values: CreateAnnouncementFormValues) => {
    const createAnnouncementResponse = await createAnnouncement(values);

    if (!createAnnouncementResponse.success) {
      return toast.error(createAnnouncementResponse.error?.message);
    }

    toast.success(t("announcements.create.success"));
    router.push("/announcements");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{t("announcements.create.form.title")}</label>
      <input {...register("title")} type='text' />
      {errors.title && <p className='text-red-600'>{errors.title?.message}</p>}
      <label>{t("announcements.create.form.content")}</label>
      <textarea {...register("content")} />
      {errors.content && (
        <p className='text-red-600'>{errors.content?.message}</p>
      )}
      <label>{t("announcements.create.form.severity")}</label>
      <select {...register("severity")}>
        <option value='INFO'>{t("announcements.create.form.info")}</option>
        <option value='WARNING'>
          {t("announcements.create.form.warning")}
        </option>
        <option value='DANGER'>{t("announcements.create.form.danger")}</option>
      </select>
      {errors.severity && (
        <p className='text-red-600'>{errors.severity?.message}</p>
      )}
      <label htmlFor='academicLevel'>{t("announcements.create.form.levels")}</label>
      <select {...register("levels")}>
        <option value='ALL'>
          {tt(locale, {
            en: "All levels",
            ar: "جميع المستويات",
          })}
        </option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      {errors.levels && (
        <p className='text-red-600'>{errors.levels?.message}</p>
      )}
      <label htmlFor='departments'>
        {t("announcements.create.form.departments")}
      </label>
      <select {...register("departments")} multiple>
        {departments.map((department) => (
          <option key={department.code} value={department._id}>
            {tt(locale, department.name)}
          </option>
        ))}
      </select>
      {errors.departments && (
        <p className='text-red-600'>{errors.departments?.message}</p>
      )}
      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t("general.loading") : t("general.submit")}
      </button>
      <button
        className='btn btn-secondary'
        onClick={() => router.push("/announcements")}
      >
        {t("general.back")}
      </button>
    </form>
  );
}
