import Link from "next/link";
import StudentPage from "./students/view/page";

export default function Home() {
  return (
    <div>
      <Link href="/students/register">
        Register new students
      </Link>
      <StudentPage/>
    </div>
  );
}
