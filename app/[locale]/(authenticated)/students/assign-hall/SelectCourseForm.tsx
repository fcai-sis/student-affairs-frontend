"use client";
import { useCurrentLocale, useI18n } from "@/locales/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { fetchLatestSemesterCourseEnrollments } from "./actions";
import { ICourse } from "@fcai-sis/shared-models";
import { useState } from "react";
import { tt } from "@/lib";

const selectCourseEnrollmentFormSchema = z.object({
  courseId: z.string().min(1, {
    message: "Please select a course",
  }),
});

export type selectCourseEnrollmentsValues = z.infer<
  typeof selectCourseEnrollmentFormSchema
>;

export default function SelectCourseForm({ courses }: { courses: ICourse[] }) {
  const [query, setQuery] = useState("");
  const t = useI18n();
  const locale = useCurrentLocale();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<selectCourseEnrollmentsValues>({
    resolver: zodResolver(selectCourseEnrollmentFormSchema),
    defaultValues: {
      courseId: "",
    },
  });

  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(query.toLowerCase())
  );

  const onSubmit = async (values: selectCourseEnrollmentsValues) => {
    const fetchCourseEnrollmentsResponse =
      await fetchLatestSemesterCourseEnrollments(values);

    if (!fetchCourseEnrollmentsResponse.success) {
      return toast.error(fetchCourseEnrollmentsResponse.error?.message);
    }

    toast.success(
      tt(locale, {
        en: "Enrollments fetched successfully",
        ar: "تم جلب الطلاب بنجاح",
      })
    );
    router.push(`/students/assign-hall/${values.courseId}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 flex flex-col gap-4 mx-auto'
    >
      <div className='mb-4'>
        <label
          htmlFor='query'
          className='block text-primary text-sm font-bold mb-2'
        >
          {tt(locale, {
            en: "Search courses",
            ar: "ابحث عن مواد",
          })}
        </label>
        <input
          type='text'
          id='query'
          placeholder={tt(locale, {
            en: "Course Code ",
            ar: " رمز المادة ",
          })}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='courseId'
          className='block text-primary text-sm font-bold mb-2'
        >
          {tt(locale, {
            en: "Select a course",
            ar: "اختار مادة",
          })}
        </label>
        <select
          id='courseId'
          {...register("courseId")}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value='' disabled>
            {tt(locale, {
              en: "Course",
              ar: "مادة",
            })}
          </option>
          {filteredCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code}
            </option>
          ))}
        </select>
        {errors.courseId && (
          <p className='text-red-500 text-xs italic'>
            {errors.courseId.message}
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
          router.push("/");
        }}
      >
        {t("general.back")}
      </button>
    </form>
  );
}
