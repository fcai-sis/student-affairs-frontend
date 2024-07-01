"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { assignHallAction } from "../actions";

const assignHallFormSchema = z.object({
  minValue: z.string(),
  maxValue: z.string(),
  hall: z.string(),
  course: z.string(),
});

export type assignHallValues = z.infer<typeof assignHallFormSchema>;

export default function AssignHallForm({ enrollments, course }: any) {
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
      hall: "",
      course: course,
    },
  });

  const onSubmit = async (values: assignHallValues) => {
    const assignHallResponse = await assignHallAction(values);

    if (!assignHallResponse.success) {
      return toast.error(assignHallResponse.error?.message);
    }

    toast.success("Assigned Halls Successfully");
    router.push(`/students/assign-hall`);
  };

  return (
    <>
      <h1>Enrollments</h1>
      {enrollments.map((enrollment: any) => (
        <div key={enrollment.id}>
          <p>{JSON.stringify(enrollment.student.fullName)}</p>
          <p>{JSON.stringify(enrollment.student.studentId)}</p>
          <p>{JSON.stringify(enrollment.examHall)}</p>
          <p>{JSON.stringify(enrollment.examSeatNumber)}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='min-value'>Min Value </label>
        <input id='min-value' type='text' {...register("minValue")} />
        {errors.minValue && (
          <p className='text-red-600'>{errors.minValue?.message}</p>
        )}
        <label htmlFor='max-value'>Max Value </label>
        <input id='max-value' type='text' {...register("maxValue")} />
        {errors.maxValue && (
          <p className='text-red-600'>{errors.maxValue?.message}</p>
        )}
        <label htmlFor='hall'>Hall </label>
        <input id='hall' type='text' {...register("hall")} />
        {errors.hall && <p className='text-red-600'>{errors.hall?.message}</p>}

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
