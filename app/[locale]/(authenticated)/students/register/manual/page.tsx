import { getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();
  return (
    <>
      <h1>{t("registerStudent.manual.title")}</h1>
    </>
  );
}
