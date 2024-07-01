"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createGraduationTeamAction } from "./actions";
import { useState } from "react";

const createGraduationFormSchema = z.object({
  enrollments: z.array(z.object({ enrollment: z.string() })).nonempty(),
  instructorTeachings: z
    .array(z.object({ instructorTeaching: z.string() }))
    .nonempty(),
  assistantTeachings: z
    .array(z.object({ assistantTeaching: z.string() }))
    .nonempty(),
});

export type CreateGraduationFormValues = z.infer<
  typeof createGraduationFormSchema
>;

export default function CreateGraduationForm({
  enrollments,
  instructorTeachings,
  assistantTeachings,
}: {
  enrollments: any[];
  instructorTeachings: any[];
  assistantTeachings: any[];
}) {
  const router = useRouter();
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([]);
  const [selectedInstructorTeachings, setSelectedInstructorTeachings] =
    useState<string[]>([]);
  const [selectedAssistantTeachings, setSelectedAssistantTeachings] = useState<
    string[]
  >([]);
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

  const handleEnrollmentChange = (index: number, value: string) => {
    const newSelectedEnrollments = [...selectedEnrollments];
    newSelectedEnrollments[index] = value;
    setSelectedEnrollments(newSelectedEnrollments);
  };

  const handleInstructorTeachingChange = (index: number, value: string) => {
    const newSelectedInstructorTeachings = [...selectedInstructorTeachings];
    newSelectedInstructorTeachings[index] = value;
    setSelectedInstructorTeachings(newSelectedInstructorTeachings);
  };

  const handleAssistantTeachingChange = (index: number, value: string) => {
    const newSelectedAssistantTeachings = [...selectedAssistantTeachings];
    newSelectedAssistantTeachings[index] = value;
    setSelectedAssistantTeachings(newSelectedAssistantTeachings);
  };

  const onSubmit = async (values: CreateGraduationFormValues) => {
    const createGraduationTeamResponse = await createGraduationTeamAction(
      values
    );

    if (!createGraduationTeamResponse.success) {
      return toast.error(createGraduationTeamResponse.error?.message);
    }

    toast.success("Graduation team created successfully");
    router.push(`/graduation`);
  };

  return (
    <>
      <h1>Create Graduation Team</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enrollments</label>
        {enrollmentFields.map((field, index) => (
          <div key={field.id}>
            <select
              {...register(`enrollments.${index}.enrollment` as const)}
              defaultValue={field.enrollment}
              onChange={(e) => {
                handleEnrollmentChange(index, e.target.value);
              }}
            >
              <option value='' disabled>
                Select an enrollment
              </option>
              {enrollments
                .filter(
                  (enrollment) =>
                    !selectedEnrollments.includes(enrollment._id) ||
                    enrollment._id === selectedEnrollments[index]
                )
                .map((enrollment) => (
                  <option key={enrollment._id} value={enrollment._id}>
                    {enrollment.student.studentId}
                  </option>
                ))}
            </select>
            {errors.enrollments && errors.enrollments[index] && (
              <span>{errors.enrollments[index]?.message}</span>
            )}
            <button
              type='button'
              onClick={() => {
                removeEnrollment(index);
                const newSelectedEnrollments = [...selectedEnrollments];
                newSelectedEnrollments.splice(index, 1);
                setSelectedEnrollments(newSelectedEnrollments);
              }}
            >
              Remove
            </button>
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
            <select
              {...register(
                `instructorTeachings.${index}.instructorTeaching` as const
              )}
              defaultValue={field.instructorTeaching}
              onChange={(e) => {
                handleInstructorTeachingChange(index, e.target.value);
              }}
            >
              <option value='' disabled>
                Select an instructor teaching
              </option>
              {instructorTeachings
                .filter(
                  (instructorTeaching) =>
                    !selectedInstructorTeachings.includes(
                      instructorTeaching._id
                    ) ||
                    instructorTeaching._id ===
                      selectedInstructorTeachings[index]
                )
                .map((instructorTeaching) => (
                  <option
                    key={instructorTeaching._id}
                    value={instructorTeaching._id}
                  >
                    {instructorTeaching.instructor.fullName}
                  </option>
                ))}
            </select>
            {errors.instructorTeachings &&
              errors.instructorTeachings[index] && (
                <span>{errors.instructorTeachings[index]?.message}</span>
              )}
            <button
              type='button'
              onClick={() => {
                removeInstructor(index);
                const newSelectedInstructorTeachings = [
                  ...selectedInstructorTeachings,
                ];
                newSelectedInstructorTeachings.splice(index, 1);
                setSelectedInstructorTeachings(newSelectedInstructorTeachings);
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type='button'
          onClick={() => appendInstructor({ instructorTeaching: "" })}
        >
          Add Instructor Teaching
        </button>

        <label>Assistant Teachings</label>
        {assistantFields.map((field, index) => (
          <div key={field.id}>
            <select
              {...register(
                `assistantTeachings.${index}.assistantTeaching` as const
              )}
              defaultValue={field.assistantTeaching}
              onChange={(e) => {
                handleAssistantTeachingChange(index, e.target.value);
              }}
            >
              <option value='' disabled>
                Select an assistant teaching
              </option>
              {assistantTeachings
                .filter(
                  (assistantTeaching) =>
                    !selectedAssistantTeachings.includes(
                      assistantTeaching._id
                    ) ||
                    assistantTeaching._id === selectedAssistantTeachings[index]
                )
                .map((assistantTeaching) => (
                  <option
                    key={assistantTeaching._id}
                    value={assistantTeaching._id}
                  >
                    {assistantTeaching.ta.fullName}
                  </option>
                ))}
            </select>
            {errors.assistantTeachings && errors.assistantTeachings[index] && (
              <span>{errors.assistantTeachings[index]?.message}</span>
            )}
            <button
              type='button'
              onClick={() => {
                removeAssistant(index);
                const newSelectedAssistantTeachings = [
                  ...selectedAssistantTeachings,
                ];
                newSelectedAssistantTeachings.splice(index, 1);
                setSelectedAssistantTeachings(newSelectedAssistantTeachings);
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type='button'
          onClick={() => appendAssistant({ assistantTeaching: "" })}
        >
          Add Assistant Teaching
        </button>

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
