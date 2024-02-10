import Locale from 'intl-locale-textinfo-polyfill'
import { Rubik } from "next/font/google";
import "../globals.css";
import { getI18n } from '@/locales/server';
import ChangeLanguageButton from '@/components/ChangeLanguageButton';

const rubik = Rubik({ subsets: ["latin", "arabic"] });

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getI18n();

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
  const { direction: dir } = new Locale(locale).textInfo

  return (
    <html lang={locale} dir={dir}>
      <body className={`${rubik.className} h-screen flex items-center justify-center`}>
        {children}
        {/* a floating button to change the language */}
        <ChangeLanguageButton />
      </body>
    </html>
  );
}
