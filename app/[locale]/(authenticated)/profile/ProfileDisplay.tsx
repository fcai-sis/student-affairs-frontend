"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateProfileAction } from "./actions";
import { useI18n } from "@/locales/client";

const updateProfileFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
});

export type updateProfileValues = z.infer<typeof updateProfileFormSchema>;

export default function UpdateProfileForm({ profileData }: any) {
  const t = useI18n();
  const profileFieldsLookup = profileData.data.reduce(
    (acc: Record<string, any>, item: Record<string, any>) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    },
    {}
  );

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<updateProfileValues>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      fullName: profileFieldsLookup["fullName"],
      email: profileFieldsLookup["email"],
    },
  });

  const onSubmit = async (values: updateProfileValues) => {
    const updateProfileResponse = await updateProfileAction(values);

    if (!updateProfileResponse.success) {
      return toast.error(updateProfileResponse.error?.message);
    }

    toast.success(t("profile.success"));
    router.push(`/profile`);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full max-w-2xl mx-auto my-8 p-4 bg-white border border-slate-200 rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>{t("profile.title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col w-full space-y-4'
      >
        <div className='flex flex-col'>
          <label className='mb-2 font-bold text-gray-700'>
            {t("profile.name")}
          </label>
          <input
            {...register("fullName")}
            type='text'
            className='w-full p-2 border border-slate-300 rounded-lg'
          />
          {errors.fullName && (
            <p className='text-red-600 mt-2'>{errors.fullName?.message}</p>
          )}
        </div>

        <div className='flex flex-col'>
          <label className='mb-2 font-bold text-gray-700'>
            {t("profile.email")}
          </label>
          <input
            {...register("email")}
            type='email'
            className='w-full p-2 border border-slate-300 rounded-lg'
          />
          {errors.email && (
            <p className='text-red-600 mt-2'>{errors.email?.message}</p>
          )}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <button className='btn' type='submit' disabled={isSubmitting}>
            {isSubmitting ? t("profile.updating") : t("profile.update")}
          </button>
          <button
            className='btn-secondary'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            {t("general.back")}
          </button>
        </div>
      </form>
    </div>
  );
}
