"use server";

import { announcementsAPI, serviceRequestsAPI } from "@/api";
import AnnouncementCard from "@/components/AnnouncementCard";
import { ServiceRequestCardMini } from "@/components/ServiceRequestCard";
import { getAccessToken, tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import Link from "next/link";

export default async function Page() {
  const t = await getI18n();
  return (
    <div>
      {/* <h1>{t("home.title")}</h1> */}
      {/* <SearchBar /> */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <Announcements />
        <ServiceRequests />
      </div>
    </div>
  );
}

async function SearchBar() {
  const t = await getI18n();
  return (
    <div className="flex justify-center gap-2">
      <input type="text" placeholder={t("home.searchPlaceholder")} />
      <button className="btn">{t("home.search")}</button>
    </div>
  );
}

async function Announcements() {
  const t = await getI18n();
  const { data } = await announcementsAPI.get("/", {
    params: {
      page: 1,
      limit: 3,
    },
  });
  const { announcements } = data;
  return (
    <div>
      <div className="flex justify-between">
        <h2>{t("home.announcements")}</h2>
        <Link href="/announcements" className="text-blue-500">
          {tt(getCurrentLocale(), {
            en: "View All",
            ar: "عرض الكل",
          })}
        </Link>
      </div>
      <div>
        {announcements.map((announcement: any, i: number) => (
          <AnnouncementCard key={i} announcement={announcement} />
        ))}
      </div>
    </div>
  );
}

async function ServiceRequests() {
  const locale = getCurrentLocale();
  const t = await getI18n();
  const accessToken = await getAccessToken();
  const { data } = await serviceRequestsAPI.get("/", {
    params: {
      page: 1,
      limit: 10,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { serviceRequests } = data;
  console.log(data);

  return (
    <div>
      <div className="flex justify-between">
        <h2>{t("home.serviceRequests")}</h2>
        <Link href="/requests" className="text-blue-500">
          {tt(getCurrentLocale(), {
            en: "View All",
            ar: "عرض الكل",
          })}
        </Link>
      </div>
      <div>
        {serviceRequests.map((serviceRequest: any, i: number) => (
          <ServiceRequestCardMini key={i} serviceRequest={serviceRequest} />
        ))}
        {serviceRequests.length === 0 && (
          <p>
            {tt(locale, {
              en: "No service requests",
              ar: "لا توجد طلبات خدمة",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
