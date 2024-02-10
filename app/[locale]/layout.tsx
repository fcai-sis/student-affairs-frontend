import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { getI18n } from "@/locales/server";
import Locale from "intl-locale-textinfo-polyfill";
import Navbar from "@/components/Navbar";
const rubik = Rubik({ subsets: ["latin", "arabic"] });

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getI18n();

  return {
    title: t("welcome", { name: locale == "ar" ? "عالم" : "World" }),
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { direction: dir } = new Locale(locale).textInfo;
  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${rubik.className} h-screen flex justify-center items-center`}
      >
        <Navbar />
        {children}

        {/* <Toaster position='top-right' /> */}
      </body>
    </html>
  );
}
