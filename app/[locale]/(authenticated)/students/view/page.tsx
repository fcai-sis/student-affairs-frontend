import Button from "@/components/Button";
import { H1 } from "@/components/H";
import StudentCard from "@/components/StudentCard";
import TextInputField from "@/components/TextInputField";

export default function Students({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className='w-min h-min flex flex-col items-center justify-center gap-4'>
      <div className='flex justify-between items-center'>
        <H1 className='mb-4'>Students</H1>
        <Button asLink myHref='/registration' variant='primary'>
          Register New Students
        </Button>
      </div>
      <input
        className='w-full p-2 rounded border border-gray-300'
        type='text'
        placeholder='Search using name, ID, address, etc...'
      />

      <StudentCard />
      <StudentCard />
      <StudentCard />
    </div>
  );
}
