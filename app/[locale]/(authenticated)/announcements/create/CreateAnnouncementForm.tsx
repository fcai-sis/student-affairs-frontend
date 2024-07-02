"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createAnnouncement } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { tt } from "@/lib";
import { useRef } from "react";
import { localizedLevel } from "@/dummy/utils";

const createAnnouncementFormSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  severity: z.enum(["INFO", "WARNING", "DANGER"]),
  levels: z.array(
    z.string().refine((value) => {
      return ["1", "2", "3", "4"].includes(value);
    })
  ),
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
      levels: [],
      departments: [],
    },
  });

  const t = useI18n();

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (values: CreateAnnouncementFormValues) => {
    const createAnnouncementResponse = await createAnnouncement(values);

    if (!createAnnouncementResponse.success) {
      return toast.error(createAnnouncementResponse.error?.message);
    }

    toast.success(t("announcements.create.success"));
    router.push("/announcements");
  };

  const adjustHeight = () => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col p-4 bg-white border border-slate-200 rounded-lg w-full max-w-2xl mx-auto my-8'
    >
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold text-gray-700'>
          {t("announcements.create.form.title")}
        </label>
        <input
          {...register("title")}
          type='text'
          className='w-full p-2 border border-slate-300 rounded-lg'
        />
        {errors.title && (
          <p className='text-red-600 mt-2'>{errors.title?.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold text-gray-700'>
          {t("announcements.create.form.content")}
        </label>
        <textarea
          {...register("content")}
          // ref={contentRef}
          className='w-full p-2 border border-slate-300 rounded-lg'
          onInput={adjustHeight}
        />
        {errors.content && (
          <p className='text-red-600 mt-2'>{errors.content?.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold text-gray-700'>
          {t("announcements.create.form.severity")}
        </label>
        <select
          {...register("severity")}
          className='w-full p-2 border border-slate-300 rounded-lg'
        >
          <option value='INFO'>{t("announcements.create.form.info")}</option>
          <option value='WARNING'>
            {t("announcements.create.form.warning")}
          </option>
          <option value='DANGER'>
            {t("announcements.create.form.danger")}
          </option>
        </select>
        {errors.severity && (
          <p className='text-red-600 mt-2'>{errors.severity?.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold text-gray-700'>
          {t("announcements.create.form.levels")}
        </label>
        <select
          {...register("levels")}
          className='w-full p-2 border border-slate-300 rounded-lg'
          multiple
        >
          <option value='1'>{tt(locale, localizedLevel(1))}</option>
          <option value='2'>{tt(locale, localizedLevel(2))}</option>
          <option value='3'>{tt(locale, localizedLevel(3))}</option>
          <option value='4'>{tt(locale, localizedLevel(4))}</option>
        </select>
        {errors.levels && (
          <p className='text-red-600 mt-2'>{errors.levels?.message}</p>
        )}
      </div>

      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-bold text-gray-700'>
          {t("announcements.create.form.departments")}
        </label>
        <select
          {...register("departments")}
          multiple
          className='w-full p-2 border border-slate-300 rounded-lg'
        >
          {departments.map((department) => (
            <option key={department.code} value={department._id}>
              {tt(locale, department.name)}
            </option>
          ))}
        </select>
        {errors.departments && (
          <p className='text-red-600 mt-2'>{errors.departments?.message}</p>
        )}
      </div>

      <div className='flex items-center justify-between mt-4'>
        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? t("general.loading") : t("general.submit")}
        </button>
        <button
          className='btn-secondary'
          type='button'
          onClick={() => router.push("/announcements")}
        >
          {t("general.back")}
        </button>
      </div>
    </form>
  );
}
