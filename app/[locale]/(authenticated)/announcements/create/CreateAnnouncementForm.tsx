"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { createAnnouncement } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";

const createAnnouncementFormSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  severity: z.enum(["INFO", "WARNING", "DANGER"]),
  level: z.string().refine((value) => {
    return ["ALL", "1", "2", "3", "4"].includes(value);
  }),
  department: z.array(z.string()),
});

type Department = {
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
      level: "ALL",
      department: [],
    },
  });

  const t = useI18n();

  const onSubmit = async (values: CreateAnnouncementFormValues) => {
    const createAnnouncementResponse = await createAnnouncement(values);

    if (!createAnnouncementResponse.success) {
      return toast.error(JSON.stringify(createAnnouncementResponse));
    }

    toast.success("Announcement created");
    router.push("/announcements");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>{t("announcements.create.form.title")}</label>
      <input {...register("title")} type="text" />
      {errors.title && <p className="text-red-600">{errors.title?.message}</p>}
      <label>{t("announcements.create.form.content")}</label>
      <textarea {...register("content")} />
      {errors.content && (
        <p className="text-red-600">{errors.content?.message}</p>
      )}
      <label>{t("announcements.create.form.severity")}</label>
      <select {...register("severity")}>
        <option value="INFO">{t("announcements.create.form.info")}</option>
        <option value="WARNING">
          {t("announcements.create.form.warning")}
        </option>
        <option value="DANGER">{t("announcements.create.form.danger")}</option>
      </select>
      {errors.severity && (
        <p className="text-red-600">{errors.severity?.message}</p>
      )}
      <label htmlFor="academicLevel">Level</label>
      <select {...register("level")}>
        <option value="ALL">All levels</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      {errors.level && <p className="text-red-600">{errors.level?.message}</p>}
      <label htmlFor="department">Department</label>
      <select {...register("department")} multiple>
        {departments.map((department) => (
          <option key={department.code} value={department.code}>
            {department.name.en}
          </option>
        ))}
      </select>
      {errors.department && (
        <p className="text-red-600">{errors.department?.message}</p>
      )}
      <button className="btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("general.loading") : t("general.submit")}
      </button>
    </form>
  );
}
