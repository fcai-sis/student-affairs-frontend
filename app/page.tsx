import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/students/register">
        Register new students
      </Link>
    </div>
  );
}
