import { useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { fetchLatestSemesterCourseEnrollments } from "./actions";

const selectCourseEnrollmentFormSchema = z.object({
  course: z.string(),
});

export type selectCourseEnrollmentsValues = z.infer<
  typeof selectCourseEnrollmentFormSchema
>;
export default function SelectCourseForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<selectCourseEnrollmentsValues>({
    resolver: zodResolver(selectCourseEnrollmentFormSchema),
    defaultValues: {
      course: "",
    },
  });

  const t = useI18n();

  const onSubmit = async (values: selectCourseEnrollmentsValues) => {
    const fetchCourseEnrollmentsResponse =
      await fetchLatestSemesterCourseEnrollments(values);

    if (!fetchCourseEnrollmentsResponse.success) {
      return toast.error(fetchCourseEnrollmentsResponse.error?.message);
    }

    toast.success("Successfully fetched enrollments");
    router.push(`/students/assign-hall/${values.course}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Select a course</label>
      <input {...register("course")} type='text' />
      {errors.course && (
        <p className='text-red-600'>{errors.course?.message}</p>
      )}

      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t("general.loading") : t("general.submit")}
      </button>
    </form>
  );
}
