"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";

const updateProfileFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileValues>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      fullName: profileData.data.fullName,
      email: profileData.data.email,
    },
  });

  const onSubmit = async (values: updateProfileValues) => {
    const updateProfileResponse = await updateProfileAction(values);

    if (!updateProfileResponse.success) {
      return toast.error(updateProfileResponse.error?.message);
    }

    toast.success("Profile Updated Successfully");
    router.push(`/profile`);
  };

  return (
    <>
      <h1>Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Full Name</label>
        <input
          {...register("fullName")}
          type='text'
          defaultValue={profileData.data.fullName}
        />
        {errors.fullName && (
          <p className='text-red-600'>{errors.fullName?.message}</p>
        )}

        <label>Email</label>
        <input
          {...register("email")}
          type='email'
          defaultValue={profileData.data.email}
        />
        {errors.email && (
          <p className='text-red-600'>{errors.email?.message}</p>
        )}

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
