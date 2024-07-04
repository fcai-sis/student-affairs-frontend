import { departmentsAPI, studentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import {
  SelectFilter,
  SelectOption,
  TextFilter,
} from "@/components/SetQueryFilter";
import StudentCard from "@/components/StudentCard";
import { localizedLevel } from "@/dummy/utils";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
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
    level: string;
  };
}>) {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const accessToken = await getAccessToken();

  const page = getCurrentPage(searchParams);

  const { data } = await studentsAPI.get("/", {
    params: {
      page,
      limit,
      department: searchParams.department,
      level: searchParams.level,
      query: searchParams.query,
      gender: searchParams.gender,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { students, totalStudents } = data;

  const { data: departmentsData } = await departmentsAPI.get("/");

  const departmentOptions = [
    {
      label: tt(locale, { en: "All Departments", ar: "جميع الأقسام" }),
      value: "",
    },
    ...departmentsData.departments.map((department: any) => ({
      label: tt(locale, department.name),
      value: department.code,
    })),
  ];

  const genderOptions: SelectOption[] = [
    {
      label: tt(locale, { en: "All", ar: "الكل" }),
      value: "",
    },
    {
      label: tt(locale, {
        en: "Male",
        ar: "ذكر",
      }),
      value: GenderEnum[0],
    },
    {
      label: tt(locale, {
        en: "Female",
        ar: "انثى",
      }),
      value: GenderEnum[1],
    },
  ];

  const levelOptions: SelectOption[] = [
    {
      label: tt(locale, { en: "All", ar: "الكل" }),
      value: "",
    },
    {
      label: tt(locale, localizedLevel(1)),
      value: "1",
    },
    {
      label: tt(locale, localizedLevel(2)),
      value: "2",
    },
    {
      label: tt(locale, localizedLevel(3)),
      value: "3",
    },
    {
      label: tt(locale, localizedLevel(4)),
      value: "4",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{t("students.title")}</h1>
      <div className="flex justify-end">
        <Link
          href="/students/register"
          className="bg-blue-500 text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors duration-300"
        >
          {t("students.registerStudent")}
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-4">
          <label className="flex flex-col">
            {t("filter.department")}
            <SelectFilter name={"department"} options={departmentOptions} />
          </label>
          <label className="flex flex-col">
            {t("filter.search")}
            <TextFilter name={"query"} />
          </label>
          <label className="flex flex-col">
            {t("filter.level")}
            <SelectFilter name={"level"} options={levelOptions} />
          </label>
          <label className="flex flex-col">
            {t("filter.gender")}
            <SelectFilter name={"gender"} options={genderOptions} />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {students.map((student: any, i: number) => (
          <StudentCard key={i} student={student} />
        ))}
      </div>
      {students.length === 0 ? (
        <p>{t("students.noStudents")}</p>
      ) : (
        <Pagination totalPages={totalStudents / limit} />
      )}
    </>
  );
}
