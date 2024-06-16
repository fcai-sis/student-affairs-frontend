import Navbar from "@/components/Navbar";

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
      <Navbar locale={locale} />
      {children}
    </>
  );
}
