import { H1, H6 } from "@/components/H";
import Button from "@/components/Button";
import TextInputField from "@/components/TextInputField";

import Image from "next/image";
import { getI18n } from "@/locales/server";

export default async function Page({ params: { locale } }: Readonly<{ params: { locale: string } }>) {
  const t = await getI18n();

  return (
    <div className="flex flex-row items-center justify-center h-96 gap-32">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <H6>{t("username")}</H6>
            <TextInputField placeholder={t("usernameHint")} />
          </div>
          <div className="flex flex-col gap-4">
            <H6>{t("password")}</H6>
            <TextInputField obscure placeholder={t("passwordHint")} />
          </div>
        </div>
        <Button variant="primary" >
          {t("login")}
        </Button>
      </div>
      <div className="w-0.5 h-full bg-slate-300 rounded-full" />
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-row gap-16">
          <Image src="/fcai.png" alt="FCAI Logo" height={200} width={222} />
          <Image src="/cu.png" alt="Cairo University Logo" height={200} width={155} />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <H1>{t("studentAffairsGateway")}</H1>
          <p className={`text-slate-400 text-center ${locale === "ar" ? "w-64" : "w-96"}`}>
            {t("forFCAICU")}
          </p>
        </div>
      </div>
    </div>
  );
}
