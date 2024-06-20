import Link from "next/link";

export default async function StudentCard({ student }: { student: any }) {
  return (
    <div className="border border-black p-4 w-64">
      <p>{student.studentId}</p>
      <p>{student.fullName}</p>
      <Link href={`/students/${student.studentId}`}>View details</Link>
    </div>
  );
}
