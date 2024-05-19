"use client";
import { useFormState } from "react-dom";
import { CancelButton } from "./cancel-button";
import { UpdateButton } from "./update-button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function EditStudentForm({
  student,
  updateStudentAction,
}: {
  student: any;
  updateStudentAction: any;
}) {
  const [state, formAction] = useFormState(updateStudentAction, null);
  console.log("student", student);
  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      } else {
        toast.success(`Student updated successfully`);
        redirect("/students/read-students");
      }
    }
  }, [state]);

  return (
    <div className='flex flex-col overflow-auto h-3/4 gap-2 p-2 rounded-lg border-2 border-slate-200 shadow-lg'>
      <form
        action={formAction}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'
      >
        <div className='mb-4'>
          <label
            htmlFor='student-name'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student Name
          </label>
          <input
            type='text'
            name='fullName'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.fullName}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='student-id'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student ID
          </label>
          <input
            type='text'
            name='studentId'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.studentId}
            disabled
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='groupCode'
            className='block text-primary text-sm font-bold mb-2'
          >
            Group Code
          </label>

          <input type='radio' name='groupCode' value='0' className='mr-2' />
          <label htmlFor='science-group' className='mr-4'>
            Science Group
          </label>
          <input type='radio' name='groupCode' value='1' className='mr-2' />
          <label htmlFor='math-group' className='mr-4'>
            Math Group
          </label>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='gender'
            className='block text-primary text-sm font-bold mb-2'
          >
            Gender
          </label>
          <select
            name='gender'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.gender}
          >
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='religion'
            className='block text-primary text-sm font-bold mb-2'
          >
            Religion
          </label>
          <select
            name='religion'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.religion}
          >
            <option value='muslim'>Muslim</option>
            <option value='christian'>Christian</option>
            <option value='other'>Other</option>
          </select>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='national-id'
            className='block text-primary text-sm font-bold mb-2'
          >
            National ID
          </label>
          <input
            type='text'
            name='nationalId'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.nationalId}
          />
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
            name='administration'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.administration}
          />
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
            name='directorate'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.directorate}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='phoneNumber'
            className='block text-primary text-sm font-bold mb-2'
          >
            Phone Number
          </label>
          <input
            type='text'
            name='phoneNumber'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.phoneNumber}
          />
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
            name='educationType'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.educationType}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='birth-date'
            className='block text-primary text-sm font-bold mb-2'
          >
            Birth Date
          </label>
          <input
            type='date'
            name='birthDate'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={`${student.birthYear}-${
              student.birthMonth < 10
                ? `0${student.birthMonth}`
                : student.birthMonth
            }-${
              student.birthDay < 10 ? `0${student.birthDay}` : student.birthDay
            }`}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='birth-place'
            className='block text-primary text-sm font-bold mb-2'
          >
            Birth Place
          </label>
          <input
            type='text'
            name='birthPlace'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.birthPlace}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='governorate-id'
            className='block text-primary text-sm font-bold mb-2'
          >
            Governorate ID
          </label>
          <input
            type='text'
            name='governorateId'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.governorateId}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='nationality'
            className='block text-primary text-sm font-bold mb-2'
          >
            Nationality
          </label>
          <select
            name='nationality'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.nationality}
          >
            <option value='egyptian'>Egyptian</option>
            <option value='foreigner'>Other</option>
          </select>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='address'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student Address
          </label>
          <input
            type='text'
            name='address'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.address}
          />
        </div>

        <UpdateButton />
        <CancelButton />
      </form>
    </div>
  );
}
