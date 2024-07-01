"use client";
import { IStudent } from "@fcai-sis/shared-models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateStudentAction } from "../register/manual/actions";

const NationalityEnum = [
  "EGYPTIAN",
  "BAHRAINI",
  "COMORAN",
  "DJIBOUTIAN",
  "ALGERIAN",
  "IRAQI",
  "JORDANIAN",
  "KUWAITI",
  "LEBANESE",
  "LIBYAN",
  "MAURITANIAN",
  "MOROCCAN",
  "OMANI",
  "PALESTINIAN",
  "QATARI",
  "SAUDI",
  "SOMALI",
  "SUDANESE",
  "SYRIAN",
  "TUNISIAN",
  "EMIRATI",
  "YEMENI",
  "FOREIGN",
] as const;

const updateStudentFormSchema = z.object({
  fullName: z.string().optional(),
  studentId: z.string().optional(),
  scientificDivision: z.enum(["SCIENCE", "MATHEMATICS"]).optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  religion: z.enum(["MUSLIM", "CHRISTIAN", "OTHER"]).optional(),
  nationalId: z.string().optional(),
  administration: z.string().optional(),
  directorate: z.string().optional(),
  phoneNumber: z.string().optional(),
  educationType: z.string().optional(),
  birthDate: z.string().optional(),
  birthPlace: z.string().optional(),
  governorateId: z.number().optional(),
  nationality: z.enum(NationalityEnum).optional(),
  address: z.string().optional(),
});

export type UpdateStudentFormValues = z.infer<typeof updateStudentFormSchema>;

export default function UpdateStudentForm({ student }: { student: IStudent }) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStudentFormValues>({
    resolver: zodResolver(updateStudentFormSchema),
    defaultValues: {
      fullName: student.fullName,
      studentId: student.studentId,
      scientificDivision: student.scientificDivision,
      gender: student.gender,
      religion: student.religion,
      nationalId: student.nationalId,
      administration: student.administration,
      directorate: student.directorate,
      phoneNumber: student.phoneNumber,
      educationType: student.educationType,
      birthDate: `${student.birthYear}-${String(student.birthMonth).padStart(
        2,
        "0"
      )}-${String(student.birthDay).padStart(2, "0")}`,
      birthPlace: student.birthPlace,
      governorateId: student.governorateId,
      nationality: student.nationality,
      address: student.address,
    },
  });

  const onSubmit = async (values: UpdateStudentFormValues) => {
    const updateStudentResponse = await updateStudentAction(values);

    if (!updateStudentResponse.success) {
      return toast.error(updateStudentResponse.error?.message);
    }

    toast.success(`Student ${values.fullName} updated successfully`);
    router.push("/students");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'
      >
        <div className='mb-4'>
          <label
            htmlFor='fullName'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student Name
          </label>
          <input
            type='text'
            {...register("fullName")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.fullName && <span>{errors.fullName.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='studentId'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student ID
          </label>
          <input
            type='text'
            {...register("studentId")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.studentId && <span>{errors.studentId.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='scientificDivision'
            className='block text-primary text-sm font-bold mb-2'
          >
            Scientific Division
          </label>
          <input
            type='radio'
            {...register("scientificDivision")}
            value='SCIENCE'
            className='mr-2'
          />
          <label htmlFor='science-group' className='mr-4'>
            Science
          </label>
          <input
            type='radio'
            {...register("scientificDivision")}
            value='MATHEMATICS'
            className='mr-2'
          />
          <label htmlFor='math-group' className='mr-4'>
            Mathematics
          </label>
          {errors.scientificDivision && (
            <span>{errors.scientificDivision.message}</span>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='gender'
            className='block text-primary text-sm font-bold mb-2'
          >
            Gender
          </label>
          <select
            {...register("gender")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='religion'
            className='block text-primary text-sm font-bold mb-2'
          >
            Religion
          </label>
          <select
            {...register("religion")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value='MUSLIM'>Muslim</option>
            <option value='CHRISTIAN'>Christian</option>
            <option value='OTHER'>Other</option>
          </select>
          {errors.religion && <span>{errors.religion.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='nationalId'
            className='block text-primary text-sm font-bold mb-2'
          >
            National ID
          </label>
          <input
            type='text'
            {...register("nationalId")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.nationalId && <span>{errors.nationalId.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='administration'
            className='block text-primary text-sm font-bold mb-2'
          >
            Administration
          </label>
          <input
            type='text'
            {...register("administration")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.administration && (
            <span>{errors.administration.message}</span>
          )}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='directorate'
            className='block text-primary text-sm font-bold mb-2'
          >
            Directorate
          </label>
          <input
            type='text'
            {...register("directorate")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.directorate && <span>{errors.directorate.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='phoneNumber'
            className='block text-primary text-sm font-bold mb-2'
          >
            Phone Number
          </label>
          <input
            type='tel'
            {...register("phoneNumber")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='educationType'
            className='block text-primary text-sm font-bold mb-2'
          >
            Education Type
          </label>
          <input
            type='text'
            {...register("educationType")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.educationType && <span>{errors.educationType.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='birthDate'
            className='block text-primary text-sm font-bold mb-2'
          >
            Birth Date
          </label>
          <input
            type='date'
            {...register("birthDate")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.birthDate && <span>{errors.birthDate.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='birthPlace'
            className='block text-primary text-sm font-bold mb-2'
          >
            Birth Place
          </label>
          <input
            type='text'
            {...register("birthPlace")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.birthPlace && <span>{errors.birthPlace.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='governorateId'
            className='block text-primary text-sm font-bold mb-2'
          >
            Governorate ID
          </label>
          <input
            type='text'
            {...register("governorateId", { valueAsNumber: true })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.governorateId && <span>{errors.governorateId.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='nationality'
            className='block text-primary text-sm font-bold mb-2'
          >
            Nationality
          </label>
          <select
            {...register("nationality")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          >
            {NationalityEnum.map((national) => (
              <option key={national} value={national}>
                {national}
              </option>
            ))}
          </select>
          {errors.nationality && <span>{errors.nationality.message}</span>}
        </div>

        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-primary text-sm font-bold mb-2'
          >
            Address
          </label>
          <input
            type='text'
            {...register("address")}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <button className='btn' type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </>
  );
}
