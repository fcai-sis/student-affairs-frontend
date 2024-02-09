import Image from "next/image";
import Link from "next/link";
import ProfileHolder from "./ui/icons/ProfileHolder";

const Navbar = () => {
  return (
    <nav className='flex flex-wrap items-center gap-2 mb-2 mx-auto p-4 border-2 rounded-md border-b-blue-500'>
      <Image src='/Logo.png' alt='logo' width={80} height={80} />
      <div className='flex flex-grow gap-2'>
        <Link href={"/services"}>Services</Link>
        <Link href={"/announcements"}>Announcements</Link>
        <Link href={"/students/read-students"}>Students</Link>
        <Link href={"/"}>Home</Link>
      </div>
      <ProfileHolder />
    </nav>
  );
};

export default Navbar;
