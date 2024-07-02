import { announcementsAPI, departmentsAPI } from "@/api";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getAccessToken, getCurrentPage, limit, tt } from "@/lib";
import { revalidatePath } from "next/cache";
import { SelectFilter } from "@/components/SetQueryFilter";

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
      label: tt(locale, { en: "All", ar: "الكل" }),
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
      <h1>{t("announcements.title")}</h1>

      <Link href='/announcements/create'>
        {t("announcements.create.title")}
      </Link>

      <div>
        <SelectFilter name='department' options={departmentOptions} />
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
      <Pagination totalPages={total / limit} />
    </>
  );
}
