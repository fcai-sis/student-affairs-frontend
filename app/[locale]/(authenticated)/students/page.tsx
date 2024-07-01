import { departmentsAPI, studentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import {
  SelectFilter,
  SelectOption,
  TextFilter,
} from "@/components/SetQueryFilter";
import StudentCard from "@/components/StudentCard";
import { getAccessToken, getCurrentPage } from "@/lib";
import { getI18n } from "@/locales/server";
import { GenderEnum } from "@fcai-sis/shared-models";
import Link from "next/link";

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams: {
    page: string;
    department: string;
    query: string;
    gender: string;
  };
}>) {
  const t = await getI18n();
  const accessToken = await getAccessToken();

  const page = getCurrentPage(searchParams);
  const limit = 5;

  const { data } = await studentsAPI.get("/", {
    params: {
      page,
      limit,
      department: searchParams.department,
      query: searchParams.query,
      gender: searchParams.gender,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { students, totalStudents } = data;

  // const { data: departmentsData } = await departmentsAPI.get("/");

  // const departments: SelectOption[] = departmentsData.departments.map(
  //   (department: any) => ({ label: department.name.en, value: department.code })
  // );

  return (
    <>
      <h1>{t("students.title")}</h1>
      <Link href='/students/register'>{t("students.registerStudent")}</Link>
      <div>
        <b>Filter: </b>
        {/* <label>Department: </label>
        <SelectFilter name={"department"} options={departments} /> */}
        <label>Search: </label>
        <TextFilter name={"query"} />
        <label>Gender: </label>
        <SelectFilter
          name={"gender"}
          options={GenderEnum.map((gender) => ({
            label: gender,
            value: gender,
          }))}
        />
      </div>
      <div>
        {students.map((student: any, i: number) => (
          <StudentCard key={i} student={student} />
        ))}
      </div>
      <Pagination totalPages={totalStudents / limit} />
    </>
  );
}
