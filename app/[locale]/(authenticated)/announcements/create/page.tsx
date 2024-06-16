"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { createAnnouncement } from "./actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const createAnnouncementFormSchema = z.object({
  title: z.string(),
  content: z.string(),
  severity: z.enum(["info", "warning", "danger"]),
});

export type CreateAnnouncementFormValues = z.infer<
  typeof createAnnouncementFormSchema
>;

export default function Page() {
  const router = useRouter();
  const form = useForm<CreateAnnouncementFormValues>({
    resolver: zodResolver(createAnnouncementFormSchema),
    defaultValues: { title: "", content: "", severity: "info" },
  });

  const onSubmit = async (values: CreateAnnouncementFormValues) => {
    const createAnnouncementResponse = await createAnnouncement(values);

    if (!createAnnouncementResponse.success) {
      return toast.error(createAnnouncementResponse.error?.message);
    }

    toast.success("Announcement created");
    router.push("/announcements");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("title")} type="text" />
      <textarea {...form.register("content")} />
      <select {...form.register("severity")}>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="danger">Danger</option>
      </select>
      <button
        className="btn"
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
