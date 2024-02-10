import { readStudent } from '@/app/api';

export type student = {
  id: string;
  fullName: string;
  address: string;
  status: string;
}
async function StudentPage() {
  
  const student = await readStudent("65c1143c7db68142c9dd0554");
  console.log(student);
  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div>
      <h1 className=' text-slate-800 text-2xl'>{student.fullName}</h1>
      <p className=' text-slate-800'>{student.address}</p>
      <p className=' text-slate-800'>{student.status}</p>
    </div>
  );
}


export default StudentPage;