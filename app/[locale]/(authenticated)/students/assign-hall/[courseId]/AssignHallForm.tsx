"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { assignHallAction } from "../actions";

const assignHallFormSchema = z.object({
  minValue: z.number(),
  maxValue: z.number(),
  hall: z.string(),
});

const updateHallAPIFormSchema = z.object({
  enrollments: z.array(z.string()),
  hall: z.string(),
});

export type updateHallAPIValues = z.infer<typeof updateHallAPIFormSchema>;

export type assignHallValues = z.infer<typeof assignHallFormSchema>;

export default function AssignHallForm({ enrollments }: any) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<assignHallValues>({
    resolver: zodResolver(assignHallFormSchema),
    defaultValues: {
      minValue: 0,
      maxValue: 0,
      hall: "",
    },
  });

  const onSubmit = async (values: assignHallValues) => {
    const selectedEnrollments = enrollments.filter((enrollment: any) => {
      return (
        enrollment.studentId >= values.minValue &&
        enrollment.studentId <= values.maxValue
      );
    });

    const selectedEnrollmentIds = selectedEnrollments.map(
      (enrollment: any) => enrollment._id
    );

    const assignHallResponse = await assignHallAction({
      enrollments: selectedEnrollmentIds,
      hall: values.hall,
    });

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
          <p>{JSON.stringify(enrollment.studentId)}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='min-value'>Min Value </label>
        <input id='min-value' type='number' {...register("minValue")} />
        {errors.minValue && (
          <p className='text-red-600'>{errors.minValue?.message}</p>
        )}
        <label htmlFor='max-value'>Max Value </label>
        <input id='max-value' type='number' {...register("maxValue")} />
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
