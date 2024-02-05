import { readStudents } from "./action";
import Link from "next/link";
import { AddBtn, DeleteBtn, EditBtn } from "./action-btn";
import { DeleteStudentForm } from "./deleteStudentForm";

export default async function ReadStudents() {
  const students = await readStudents(1);

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Students</h1>

      <table className='min-w-full border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-4 border-r'>Full Name</th>
            <th className='py-2 px-4 border-r'>Status</th>
            <th className='py-2 px-4'>Address</th>
            <th className='py-2 px-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any, index: number) => (
            <tr key={index}>
              <td className='py-2 px-4 border-r'>{student.fullName}</td>
              <td className='py-2 px-4 border-r'>{student.status}</td>
              <td className='py-2 px-4'>{student.address}</td>
              <td className='py-2 px-4 flex items-center justify-center space-x-2'>
                <Link
                  className='text-white-500'
                  href={`/students/edit-student/id=${student._id}`}
                >
                  <EditBtn />
                </Link>
                <DeleteStudentForm id={student._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link href='/students/add-student'>
        <AddBtn />
      </Link>
    </div>
  );
}
