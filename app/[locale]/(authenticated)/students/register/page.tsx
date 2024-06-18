import { getI18n } from "@/locales/server";
import Link from "next/link";

export default async function Page() {
  const t = await getI18n();
  return (
    <>
      <h1>{t("registerStudent.title")}</h1>
      <Link href="/students/register/manual">
        {t("registerStudent.manual.title")}
      </Link>
      <Link href="/students/register/upload">
        {t("registerStudent.upload.title")}
      </Link>
    </>
  );
}
