"use client";
import AnnouncementCard from "@/components/AnnouncementCard";
import { H1 } from "@/components/H";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import createAnnouncementAction from "./action";

export default async function Page() {
  const [state, formAction] = useFormState(createAnnouncementAction, null);
  if (state?.success) {
    toast.success("Announcement created successfully");
  } else {
    toast.error("Failed to create announcement");
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <H1>Announcements</H1>
        <form action={formAction}>
          <input type='text' name='title' placeholder='Title' />
          <textarea name='content' placeholder='Content' />
          <select name='severity'>
            <option value='info'>Info</option>
            <option value='warning'>Warning</option>
            <option value='danger'>Danger</option>
          </select>
          <select name='level'>
            <option value='1'>Level 1</option>
            <option value='2'>Level 2</option>
            <option value='3'>Level 3</option>
            <option value='4'>Level 4</option>
          </select>
          <input type='text' name='department' placeholder='Department' />
          <button type='submit'>Create</button>
        </form>
        <div>
          <h1>Recent Announcements</h1>
        </div>
        <div>
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
      </div>
    </>
  );
}
