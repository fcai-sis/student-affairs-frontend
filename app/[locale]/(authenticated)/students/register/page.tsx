import PencilIcon from "@/components/ui/icons/PencilIcon";
import UploadIcon from "@/components/ui/icons/UploadIcon";
import { ensureAuthenticated } from "@/lib";
import { getI18n } from "@/locales/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  await ensureAuthenticated();
  const t = await getI18n();
  return (
    <>
      <div className='flex flex-col items-center w-min h-min gap-16'>
        <div className='flex justify-start w-[900px] h-min '>
          <h1 className='text-2xl font-bold w-max h-min'>
            {t("Register Students")}
          </h1>
        </div>
        <div className='flex justify-center w-min h-min gap-16'>
          <div className='flex flex-col gap-8 items-center w-min h-min'>
            <Link href={"/students/register/manual/add-student"}>
              <button
                type='button'
                className='text-white drop-shadow-md bg-blue-500 transition duration-200 ease-in-out hover:bg-blue-600 active:bg-blue-800 rounded-lg gap-8 gap-x-4 gap-y-4 w-[200px] h-[200px]'
              >
                <div className='flex justify-center mb-4'>
                  <PencilIcon />
                </div>
                <p className='text-lg font-bold'>{t("Manual Registration")}</p>
              </button>
            </Link>
            <p className='flex text-center w-max h-min text-base text-slate-400'>
              {t("Add a student manually")}
            </p>
          </div>

          <div className='flex flex-col gap-8 items-center w-[400px] h-min'>
            <Link href={"/students/register/upload-excel"}>
              <button
                type='button'
                className='text-black drop-shadow-md bg-slate-50 transition duration-200 ease-in-out hover:bg-slate-100 active:bg-slate-200 rounded-lg gap-8 gap-x-4 gap-y-4 w-[200px] h-[200px]'
              >
                <div className='flex justify-center mb-4'>
                  <Image
                    src={"/excelIcon.png"}
                    alt='Excel Icon'
                    height={64}
                    width={64}
                  />
                  <UploadIcon />
                </div>
                <p className='text-lg font-bold'>{t("Upload Excel")}</p>
              </button>
            </Link>
            <p className='flex w-max h-min text-center text-sm text-slate-400'>
              {t("Upload an excel file with student information")} <br />
              {t(
                "Please ensure that the student information is correct before uploading"
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
