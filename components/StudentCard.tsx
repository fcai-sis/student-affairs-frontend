import { localizedLevel } from "@/dummy/utils";
import { tt } from "@/lib";
import { getCurrentLocale } from "@/locales/server";
import Link from "next/link";

export default async function StudentCard({ student }: { student: any }) {
  const locale = getCurrentLocale();
  const colors =
    student.level === 1
      ? "bg-green-100 text-green-500"
      : student.level === 2
      ? "bg-pink-100 text-pink-500"
      : student.level === 3
      ? "bg-yellow-100 text-yellow-500"
      : "bg-red-100 text-red-500";

  return (
    <div className='flex flex-col border border-slate-200 w-full p-4 rounded-lg my-2 bg-white shadow-md'>
      <div className='flex flex-col items-end gap-2 justify-end w-full text-nowrap'>
        <small className='bg-blue-100 text-blue-500 flex justify-start text-base rounded-lg px-2 py-1 h-min w-min'>
          {tt(locale, student.major.name)}
        </small>
        <small
          className={`${colors} flex justify-start text-base rounded-lg px-2 py-1 h-min w-min`}
        >
          {tt(locale, localizedLevel(student.level))}
        </small>
      </div>
      <h3 className='text-xl font-bold mb-2'>{student.fullName}</h3>
      <p className='text-slate-700 mb-1'>{student.studentId}</p>
      <div className='flex'>
        <Link
          className='flex gap-2 bg-blue-500 text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors duration-300'
          href={`/students/${student.studentId}`}
        >
          {tt(locale, {
            en: "Student Details",
            ar: "تفاصيل الطالب",
          })}
        </Link>
      </div>
    </div>
  );
}

export async function StudentCardMini({ student }: { student: any }) {
  return (
    <div className='flex flex-col border border-slate-200 w-full p-4 rounded-lg my-2 bg-white shadow-md'>
      <h3 className='text-xl font-bold mb-2'>{student.fullName}</h3>
      <p className='text-slate-700 mb-1'>{student.studentId}</p>
    </div>
  );
}
