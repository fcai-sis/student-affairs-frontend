"use server";

import AnnouncementCard from "@/components/AnnouncementCard";
import { PageHeader } from "@/components/PageBuilder";
import { ServiceRequestCardMini } from "@/components/ServiceRequestCard";
import { tt } from "@/lib";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { getAnnouncements, getServiceRequests } from "@/queries";
import Link from "next/link";

export default async function Page() {
  return (
    <>
      <PageHeader
        title={tt(getCurrentLocale(), {
          en: "Home",
          ar: "الرئيسية",
        })}
        actions={[]}
      />
      {/* <SearchBar /> */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <Announcements />
        <ServiceRequests />
      </div>
    </>
  );
}

async function Announcements() {
  const t = await getI18n();

  const { announcements } = await getAnnouncements({ page: 1, limit: 10 });
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

  const { serviceRequests } = await getServiceRequests({ page: 1, limit: 10 });

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
