"use client";

import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchStudentData from "../api";
import { useFormState } from "react-dom";
import { updateStudent } from "../action";
import toast from "react-hot-toast";
import { UpdateButton } from "../update-button";
import { CancelButton } from "../cancel-button";

type Student = {
  _id: string;
  fullName: string;
  status: string;
  address: string;
};

export default function Page() {
  // Get the student ID from the URL
  const params = usePathname();
  const router = useRouter();
  const [student, setStudent] = useState<Student>({
    _id: "",
    fullName: "",
    status: "",
    address: "",
  });

  const [state, formAction] = useFormState(updateStudent, null);

  //   Fetch the student data from the server
  useEffect(() => {
    const fillForm = async () => {
      const data = await fetchStudentData(params.split("=")[1]);
      console.log(data);
      setStudent(data);
    };
    fillForm();
    if (state) {
      if (state.error) {
        toast.error(state.error);
      } else {
        toast.success(`Student ${state.student.fullName} updated successfully`);
        redirect("/students/read-students");
      }
    }
  }, [state, params]);

  return (
    <div className='flex items-center justify-center min-h-screen'>
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
            name='student-name'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.fullName}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='student-status'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student Status
          </label>
          <select
            name='student-status'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.status}
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='student-address'
            className='block text-primary text-sm font-bold mb-2'
          >
            Student Address
          </label>
          <input
            type='text'
            name='student-address'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline'
            defaultValue={student.address}
          />
        </div>
        <input type='hidden' value={student._id} name='_id' />
        <UpdateButton />
        <CancelButton />
      </form>
    </div>
  );
}
