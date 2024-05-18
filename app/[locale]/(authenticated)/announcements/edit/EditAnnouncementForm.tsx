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
      <input
        type='text'
        name='title'
        placeholder='Title'
        defaultValue={data.title}
      />
      <textarea
        name='content'
        placeholder='Content'
        defaultValue={data.content}
      />
      <select name='severity' defaultValue={data.severity}>
        <option value='info'>Info</option>
        <option value='warning'>Warning</option>
        <option value='danger'>Danger</option>
      </select>
      <select name='academicLevel' defaultValue={data.academicLevel}>
        <option value='1'>Level 1</option>
        <option value='2'>Level 2</option>
        <option value='3'>Level 3</option>
        <option value='4'>Level 4</option>
      </select>
      <input
        type='text'
        name='department'
        placeholder='Department'
        defaultValue={data.department}
      />
      <button type='submit'>Update</button>

      <input type='hidden' value={data._id} name='_id' />
    </form>
  );
}
