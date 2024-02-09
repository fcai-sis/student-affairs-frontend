import Button from "@/components/Button";
import { getI18n } from "@/locales/server";

export default async function Page() {
  const t = await getI18n();

  return (
    <>
      <Button variant="primary">
        {t("clickMe")}
      </Button>
      <Button variant="danger">
        {t("clickMe")}
      </Button>
    </>
  );
}
