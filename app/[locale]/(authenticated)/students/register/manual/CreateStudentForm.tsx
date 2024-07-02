"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { createStudentAction } from "./actions";

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

const createStudentFormSchema = z.object({
  fullName: z.string().min(1),
  studentId: z.string().min(1),
  scientificDivision: z.enum(["SCIENCE", "MATHEMATICS"]),
  gender: z.enum(["MALE", "FEMALE"]),
  religion: z.enum(["MUSLIM", "CHRISTIAN", "OTHER"]),
  nationalId: z.string().min(1),
  administration: z.string().min(1),
  directorate: z.string().min(1),
  phoneNumber: z.string().min(1),
  educationType: z.string().min(1),
  birthDate: z.string().min(1),
  birthPlace: z.string().min(1),
  governorateId: z.number().min(1),
  nationality: z.enum(NationalityEnum),
  address: z.string().min(1),
});

export type CreateStudentFormValues = z.infer<typeof createStudentFormSchema>;

export default function CreateStudentForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentFormSchema),
    defaultValues: {
      fullName: "",
      studentId: "",
      scientificDivision: "SCIENCE",
      gender: "MALE",
      religion: "MUSLIM",
      nationalId: "",
      administration: "",
      directorate: "",
      phoneNumber: "",
      educationType: "",
      birthDate: "",
      birthPlace: "",
      governorateId: 0,
      nationality: "EGYPTIAN",
      address: "",
    },
  });

  const onSubmit = async (values: CreateStudentFormValues) => {
    const createStudentResponse = await createStudentAction(values);

    if (!createStudentResponse.success) {
      return toast.error(createStudentResponse.error?.message);
    }

    toast.success(`Student ${values.fullName} added successfully`);
    router.push("/students");
  };

  return (
    <>
      <h1>Add Student</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 flex flex-col gap-4 mx-auto'
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

        <button
          className='btn flex justify-center'
          type='submit'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
    </>
  );
}
