"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { assignHallAction } from "../actions";
import { tt } from "@/lib";
import { useCurrentLocale, useI18n } from "@/locales/client";

const assignHallFormSchema = z.object({
  minValue: z.string().min(1, {
    message: "Please enter a min value",
  }),
  maxValue: z.string().min(1, {
    message: "Please enter a max value",
  }),
  hall: z.string().min(1, {
    message: "Please select a hall",
  }),
  course: z.string(),
});

export type assignHallValues = z.infer<typeof assignHallFormSchema>;

export default function AssignHallForm({ halls, course }: any) {
  const locale = useCurrentLocale();
  const t = useI18n();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<assignHallValues>({
    resolver: zodResolver(assignHallFormSchema),
    defaultValues: {
      minValue: "",
      maxValue: "",
      course: course,
    },
  });

  const onSubmit = async (values: assignHallValues) => {
    const assignHallResponse = await assignHallAction(values);

    if (!assignHallResponse.success) {
      return toast.error(assignHallResponse.error?.message);
    }

    toast.success(
      tt(locale, {
        en: "Hall assigned successfully",
        ar: "تم تعيين القاعة بنجاح",
      })
    );
    router.push(`/students/assign-hall`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg flex flex-col gap-4'
      >
        <div className='mb-4'>
          <label
            htmlFor='min-value'
            className='block text-primary text-sm font-bold mb-2'
          >
            {tt(locale, {
              en: "From Student ID",
              ar: "من رقم الطالب",
            })}
          </label>
          <input
            id='min-value'
            type='text'
            {...register("minValue")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.minValue && (
            <p className='text-red-600 text-xs italic'>
              {errors.minValue?.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='max-value'
            className='block text-primary text-sm font-bold mb-2'
          >
            {tt(locale, {
              en: "To Student ID",
              ar: "الى رقم الطالب",
            })}
          </label>
          <input
            id='max-value'
            type='text'
            {...register("maxValue")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.maxValue && (
            <p className='text-red-600 text-xs italic'>
              {errors.maxValue?.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='hall'
            className='block text-primary text-sm font-bold mb-2'
          >
            {tt(locale, {
              en: "Select a hall",
              ar: "اختار قاعة",
            })}
          </label>
          <select
            id='hall'
            {...register("hall")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          >
            <option disabled selected>
              {tt(locale, {
                en: "Select a hall",
                ar: "اختار قاعة",
              })}
            </option>
            {halls.map((hall: any) => (
              <option key={hall._id} value={hall._id}>
                {tt(locale, hall.name)}
              </option>
            ))}
          </select>
          {errors.hall && (
            <p className='text-red-600 text-xs italic'>
              {errors.hall?.message}
            </p>
          )}
        </div>

        <button
          className='btn flex justify-center'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? t("general.loading") : t("general.submit")}
        </button>
        <button
          className='btn-secondary flex justify-center'
          type='button'
          onClick={(e) => {
            e.preventDefault();
            router.push("/students");
          }}
        >
          {t("general.back")}
        </button>
      </form>
    </>
  );
}
