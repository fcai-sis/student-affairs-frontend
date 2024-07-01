import { getAccessToken } from "@/lib";
import CreateGraduationForm from "./CreateGraduationForm";
import { revalidatePath } from "next/cache";
import { graduationAPI } from "@/api";

export const getGraduationProjectEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-enrolls`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch enrollments");

  revalidatePath("/graduation");

  return response.data;
};

export const getGraduationProjectTeachings = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-teachings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch teachings");

  revalidatePath("/graduation");

  return response.data;
};

export default async function Page() {
  const enrollmentResponse = await getGraduationProjectEnrollments();
  const enrollments = enrollmentResponse.enrollments;
  const teachingResponse = await getGraduationProjectTeachings();
  const instructorTeachings = teachingResponse.instructorTeachings;
  const assistantTeachings = teachingResponse.taTeachings;

  return (
    <>
      <CreateGraduationForm
        enrollments={enrollments}
        instructorTeachings={instructorTeachings}
        assistantTeachings={assistantTeachings}
      />
    </>
  );
}
