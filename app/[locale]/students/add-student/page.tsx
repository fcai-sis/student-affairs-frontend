// components/AddStudent.js
"use client";

import { useFormState } from "react-dom";
import { createStudent } from "./action";
import { SubmitButton } from "./submit-button";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { CancelButton } from "../edit-student/cancel-button";

export default function AddStudent() {
  const [state, formAction] = useFormState(createStudent, null);

  useEffect(() => {
    if (state) {
      if (state.error) {
        toast.error(state.error);
      } else {
        toast.success(`Student ${state.student.fullName} added successfully`);
        redirect("/students/read-students");
      }
    }
  }, [state]);

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
          >
            <option value='' disabled>
              Select status
            </option>
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
          />
        </div>

        <SubmitButton />
        <CancelButton />
      </form>
    </div>
  );
}
