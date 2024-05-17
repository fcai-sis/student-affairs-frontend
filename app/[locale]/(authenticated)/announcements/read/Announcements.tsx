"use client";
import { H1 } from "@/components/H";

export default function Announcements({ data }: { data: any[] }) {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <H1>Announcements</H1>
      </div>
      <div className='flex flex-col gap-4'>
        {data.map((announcement, index) => (
          <div key={index} className='flex gap-2'>
            <div>{announcement.title}</div>
            <div>{announcement.content}</div>
            <div>{announcement.severity}</div>
            <div>{announcement.level}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
