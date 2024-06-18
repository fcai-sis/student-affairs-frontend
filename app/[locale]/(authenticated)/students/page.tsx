import { studentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import StudentCard from "@/components/StudentCard";
import { getAccessToken, getCurrentPage } from "@/lib";
import { getI18n } from "@/locales/server";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string } }>) {
  const t = await getI18n();
  const accessToken = await getAccessToken();

  const page = getCurrentPage(searchParams);
  const pageSize = 5;

  const { data } = await studentsAPI.get("/read", {
    params: {
      page,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { students, totalStudents } = data;

  return (
    <>
      <h1>{t("students.title")}</h1>
      <Link href="/students/register">{t("students.registerStudent")}</Link>
      <div>
        {students.map((student: any, i: number) => (
          <StudentCard key={i} student={student} />
        ))}
      </div>
      <Pagination
        route="students"
        currentPage={page}
        totalPages={totalStudents / pageSize}
      />
    </>
  );
}
