import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <>
      <nav className="flex p-4 bg-transparent justify-between items-center fixed top-0 w-full">
        <div className="flex items-center gap-8">
          <Image src="/fcai.png" alt="FCAI Logo" height={50} width={55} />
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/">Home</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
        <div>
          <Link href="/">profile</Link>
        </div>
      </nav>
      {children}
    </>
  );
}

