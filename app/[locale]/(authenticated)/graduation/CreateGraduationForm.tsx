"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createGraduationTeamAction } from "./actions";

const createGraduationFormSchema = z.object({
  enrollments: z.array(z.object({ enrollment: z.string() })),
  instructorTeachings: z.array(z.object({ instructorTeaching: z.string() })),
  assistantTeachings: z.array(z.object({ assistantTeaching: z.string() })),
  semester: z.string(),
});

export type CreateGraduationFormValues = z.infer<
  typeof createGraduationFormSchema
>;

export default function CreateGraduationForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateGraduationFormValues>({
    resolver: zodResolver(createGraduationFormSchema),
    defaultValues: {
      enrollments: [{ enrollment: "" }],
      instructorTeachings: [{ instructorTeaching: "" }],
      assistantTeachings: [{ assistantTeaching: "" }],
      semester: "",
    },
  });

  const {
    fields: enrollmentFields,
    append: appendEnrollment,
    remove: removeEnrollment,
  } = useFieldArray({
    control,
    name: "enrollments",
  });

  const {
    fields: instructorFields,
    append: appendInstructor,
    remove: removeInstructor,
  } = useFieldArray({
    control,
    name: "instructorTeachings",
  });

  const {
    fields: assistantFields,
    append: appendAssistant,
    remove: removeAssistant,
  } = useFieldArray({
    control,
    name: "assistantTeachings",
  });

  const onSubmit = async (values: CreateGraduationFormValues) => {
    const createGraduationTeamResponse = await createGraduationTeamAction(
      values
    );

    if (!createGraduationTeamResponse.success) {
      return toast.error(createGraduationTeamResponse.error?.message);
    }

    toast.success("Graduation team created successfully");
    router.push(`/profile`);
  };

  return (
    <>
      <h1>Create Graduation Team</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enrollments</label>
        {enrollmentFields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`enrollments.${index}.enrollment`)}
              type='text'
            />
            <button type='button' onClick={() => removeEnrollment(index)}>
              Remove
            </button>
            {errors.enrollments && errors.enrollments[index] && (
              <p className='text-red-600'>
                {errors.enrollments[index]?.message}
              </p>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendEnrollment({ enrollment: "" })}
        >
          Add Enrollment
        </button>

        <label>Instructor Teachings</label>
        {instructorFields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`instructorTeachings.${index}.instructorTeaching`)}
              type='text'
            />
            <button type='button' onClick={() => removeInstructor(index)}>
              Remove
            </button>
            {errors.instructorTeachings &&
              errors.instructorTeachings[index] && (
                <p className='text-red-600'>
                  {errors.instructorTeachings[index]?.message}
                </p>
              )}
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendInstructor({ instructorTeaching: "" })}
        >
          Add Instructor
        </button>

        <label>Assistant Teachings</label>
        {assistantFields.map((field, index) => (
          <div key={field.id}>
            <input
              {...register(`assistantTeachings.${index}.assistantTeaching`)}
              type='text'
            />
            <button type='button' onClick={() => removeAssistant(index)}>
              Remove
            </button>
            {errors.assistantTeachings && errors.assistantTeachings[index] && (
              <p className='text-red-600'>
                {errors.assistantTeachings[index]?.message}
              </p>
            )}
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendAssistant({ assistantTeaching: "" })}
        >
          Add Assistant
        </button>

        <label>Semester</label>
        <input {...register("semester")} type='text' />
        {errors.semester && (
          <p className='text-red-600'>{errors.semester?.message}</p>
        )}

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
