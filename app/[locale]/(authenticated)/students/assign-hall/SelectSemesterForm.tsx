import { useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { fetchSemesterEnrollments } from "./actions";

const selectSemesterEnrollmentsFormSchema = z.object({
  semester: z.string(),
});



export type selectSemesterEnrollmentsValues = z.infer<
  typeof selectSemesterEnrollmentsFormSchema
>;
export default function SelectSemesterForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<selectSemesterEnrollmentsValues>({
    resolver: zodResolver(selectSemesterEnrollmentsFormSchema),
    defaultValues: {
      semester: "",
    },
  });

  const t = useI18n();

  const onSubmit = async (values: selectSemesterEnrollmentsValues) => {
    const fetchSemesterEnrollmentsResponse = await fetchSemesterEnrollments(
      values
    );

    if (!fetchSemesterEnrollmentsResponse.success) {
      return toast.error(fetchSemesterEnrollmentsResponse.error?.message);
    }

    toast.success("Successfully fetched enrollments");
    router.push(`/students/assign-hall/${values.semester}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Select a semester</label>
      <input {...register("semester")} type='text' />
      {errors.semester && (
        <p className='text-red-600'>{errors.semester?.message}</p>
      )}

      <button className='btn' type='submit' disabled={isSubmitting}>
        {isSubmitting ? t("general.loading") : t("general.submit")}
      </button>
    </form>
  );
}
