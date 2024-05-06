"use client";
import { useFormState } from "react-dom";
import updateAnnouncementAction from "./action";

export default function editAnnouncementForm({ data }: { data: any }) {
  const [state, formAction] = useFormState(updateAnnouncementAction, null);

  return (
    <form
      action={formAction}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'
    >
      <div className='mb-4'>
        <label
          htmlFor='announcement-title'
          className='block text-primary text-sm font-bold mb-2'
        >
          Announcement Title
        </label>
        <input
          type='text'
          name='announcement-title'
          id='announcement-title'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          defaultValue={data.title}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='announcement-content'
          className='block text-primary text-sm font-bold mb-2'
        >
          Announcement Content
        </label>
        <textarea
          name='announcement-content'
          id='announcement-content'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          defaultValue={data.content}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='announcement-severity'
          className='block text-primary text-sm font-bold mb-2'
        >
          Announcement Severity
        </label>
        <input
          type='text'
          name='announcement-severity'
          id='announcement-severity'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          defaultValue={data.severity}
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='announcement-level'
          className='block text-primary text-sm font-bold mb-2'
        >
          Announcement Level
        </label>
        <input
          type='text'
          name='announcement-level'
          id='announcement-level'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          defaultValue={data.level}
        />
      </div>
      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Update
        </button>
        <button
          type='button'
          className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Cancel
        </button>
      </div>

      <input type='hidden' value={data._id} name='_id' />
    </form>
  );
}
