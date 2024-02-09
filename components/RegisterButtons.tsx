import Image from "next/image";
import PencilIcon from "./ui/icons/PencilIcon";
import UploadIcon from "./ui/icons/UploadIcon";

const RegisterButtons = () => {
  return (
    <>
      <div className='flex justify-center'>
        <h1>Register Students</h1>
      </div>
      <div className='flex justify-around'>
        <div className='flex flex-col items-center max-w-[400px]'>
          <button
            type='button'
            className='text-black drop-shadow-xl bg-slate-50 hover:bg-slate-100 rounded-lg text-sm py-2.5 mb-2 w-[200px] h-[200px]'
          >
            <div className='flex justify-center'>
              <UploadIcon />
              <Image
                src={"/excelIcon.png"}
                alt='Excel Icon'
                height={64}
                width={64}
              />
            </div>
            <p>Upload Excel</p>
          </button>

          <p className='mt-3 text-sm text-center'>
            Upload an excel file with student information <br />
            Please ensure that the student information is correct before
            uploading
          </p>
        </div>
        <div className='flex flex-col items-center max-w-[400px]'>
          <button
            type='button'
            className='text-white drop-shadow-xl bg-blue-700 hover:bg-blue-800 rounded-lg text-sm py-2.5 mb-2 w-[200px] h-[200px]'
          >
            <div className='flex justify-center'>
              <PencilIcon />
            </div>
            Manual Registration
          </button>
          <p className='flex gap-2 mt-3 text-sm'>Add a student manually</p>
        </div>
      </div>
    </>
  );
};

export default RegisterButtons;
