import Locale from 'intl-locale-textinfo-polyfill'
import { Rubik } from "next/font/google";
import "../globals.css";
import { getI18n } from '@/locales/server';

const rubik = Rubik({ subsets: ["latin", "arabic"] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getI18n();

  console.log("generating metadata");

  return {
    title: t("welcome", { name: locale == "ar" ? "عالم" : "World" }),
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  console.log("rendering layout");

  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html lang={locale} dir={dir}>
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
