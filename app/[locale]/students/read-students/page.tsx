import { readStudents } from "./action";
import Link from "next/link";
import { AddBtn, EditBtn } from "./action-btn";
import { DeleteStudentForm } from "../delete-student/deleteStudentForm";
import { TODO } from "../TODO";
import Pagination from "./pagination";
import { redirect } from "next/navigation";
import { PAGE_SIZE } from "../constants";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  let page = parseInt(searchParams.page, 10);
  if (!page || page < 1) page = 1;

  const data: TODO = await readStudents(page);

  const totalPages = Math.ceil(data.totalStudents / PAGE_SIZE);
  if (data.students.length === 0) {
    redirect(`/students/read-students?page=${totalPages}`);
  }
  const students = data.students;

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mb-4'>Students</h1>

      <table className='min-w-full border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='py-2 px-4 border-r'>Full Name</th>
            <th className='py-2 px-4 border-r'>Student ID</th>
            <th className='py-2 px-4 border-r'>Group Code</th>
            <th className='py-2 px-4 border-r'>Gender</th>
            <th className='py-2 px-4 border-r'>Religion</th>
            <th className='py-2 px-4 border-r'>National ID</th>
            <th className='py-2 px-4 border-r'>Administration</th>
            <th className='py-2 px-4 border-r'>Directorate</th>
            <th className='py-2 px-4 border-r'>Phone Number</th>
            <th className='py-2 px-4 border-r'>Education Type</th>
            <th className='py-2 px-4 border-r'>Birth Date</th>
            <th className='py-2 px-4 border-r'>Birth Place</th>
            <th className='py-2 px-4'>Governorate ID</th>
            <th className='py-2 px-4'>Nationality</th>
            <th className='py-2 px-4'>Address</th>
            <th className='py-2 px-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any, index: number) => (
            <tr key={index}>
              <td className='py-2 px-4 border-r'>{student.fullName}</td>
              <td className='py-2 px-4 border-r'>{student.studentId}</td>
              <td className='py-2 px-4 border-r'>{
                student.groupCode === 0 ? 'Science Group' : 'Math Group'
              }</td>
              <td className='py-2 px-4 border-r'>{student.gender}</td>
              <td className='py-2 px-4 border-r'>{student.religion}</td>
              <td className='py-2 px-4 border-r'>{student.nationalId}</td>
              <td className='py-2 px-4 border-r'>{student.administration}</td>
              <td className='py-2 px-4 border-r'>{student.directorate}</td>
              <td className='py-2 px-4 border-r'>{student.phoneNumber}</td>
              <td className='py-2 px-4 border-r'>{student.educationType}</td>
              <td className='py-2 px-4 border-r'>{student.birthDate}</td>
              <td className='py-2 px-4 border-r'>{student.birthPlace}</td>
              <td className='py-2 px-4 border-r'>{student.governorateId}</td>
              <td className='py-2 px-4 border-r'>{student.nationality}</td>
              <td className='py-2 px-4'>{student.address}</td>
              <td className='py-2 px-4 flex items-center justify-center space-x-2'>
                <Link href={`/students/edit-student/id=${student._id}`}>
                  <EditBtn />
                </Link>
                <DeleteStudentForm id={student._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={page} totalPages={totalPages} />
      <Link href='/students/add-student'>
        <AddBtn />
      </Link>
    </div>
  );
}
