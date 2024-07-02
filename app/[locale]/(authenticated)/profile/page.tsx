import { I18nProviderClient } from "@/locales/client";
import { getProfileAction } from "./actions";
import ProfileDisplay from "./ProfileDisplay";

export default async function Page({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const profileDataResponse = await getProfileAction();

  return (
    <>
      <I18nProviderClient locale={locale}>
        <ProfileDisplay profileData={profileDataResponse} />
      </I18nProviderClient>
    </>
  );
}
