import Pagination from "@/components/Pagination";
import {
  SelectFilter,
  SelectOption,
  TextFilter,
} from "@/components/SetQueryFilter";
import { localizedLevel } from "@/dummy/utils";
import { getCurrentPage, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getAllDepartments, getStudents } from "@/queries";
import { GenderEnum } from "@fcai-sis/shared-models";
import Link from "next/link";

const studentsLimit = 30;

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

  const page = getCurrentPage(searchParams);

  const { students, totalStudents } = await getStudents({
    page,
    limit: studentsLimit,
    department: searchParams.department,
    query: searchParams.query,
    level: searchParams.level,
    gender: searchParams.gender,
  });

  const { departments } = await getAllDepartments();

  const departmentOptions = [
    {
      label: tt(locale, { en: "All Departments", ar: "جميع الأقسام" }),
      value: "",
    },
    ...departments.map((department: any) => ({
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tt(locale, {
                  en: "Student ID",
                  ar: "رقم الطالب",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tt(locale, {
                  en: "Full Name",
                  ar: "الاسم الكامل",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tt(locale, {
                  en: "Department",
                  ar: "القسم",
                })}
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                {tt(locale, {
                  en: "Level",
                  ar: "المستوى",
                })}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student: any, i: number) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {tt(locale, student.major.name)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {tt(locale, localizedLevel(student.level))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {students.length === 0 ? (
        <p>{t("students.noStudents")}</p>
      ) : (
        <Pagination totalPages={totalStudents / studentsLimit} />
      )}
    </>
  );
}
