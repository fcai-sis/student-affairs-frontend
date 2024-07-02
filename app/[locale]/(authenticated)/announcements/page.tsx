import { announcementsAPI, departmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { revalidatePath } from "next/cache";
import { SelectFilter } from "@/components/SetQueryFilter";
import { Plus } from "iconoir-react";

export const getDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch departments");

  revalidatePath("/announcements");

  return response.data;
};

export default async function Page({
  searchParams,
}: Readonly<{ searchParams: { page: string; department: string } }>) {
  const t = await getI18n();
  const locale = getCurrentLocale();
  const page = getCurrentPage(searchParams);

  const departmentResponse = await getDepartments();
  const departments = departmentResponse.departments;

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

  const { data } = await announcementsAPI.get("/", {
    params: {
      skip: page * limit - limit,
      limit,
      department: searchParams.department,
    },
  });
  const { announcements, total } = data;

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>{t("announcements.title")}</h1>
      <div className='flex justify-end'>
        <Link
          className='flex gap-2 bg-blue-500 text-white font-bold hover:bg-blue-700 py-2 px-4 active:bg-blue-900'
          href='/announcements/create'
        >
          {t("announcements.create.title")}
          <Plus className='[&>*]:stroke-white' />
        </Link>
      </div>

      <div className='mt-4'>
        <SelectFilter name='department' options={departmentOptions} />
        <div className='grid grid-cols-1 gap-4 mt-4'>
          {announcements.map((announcement: any, i: number) => (
            <AnnouncementCard key={i} announcement={announcement} />
          ))}
        </div>
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}
