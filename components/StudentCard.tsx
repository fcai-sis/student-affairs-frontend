export default function StudentCard() {
  return (
    <div className='grid grid-cols-1 gap-4 w-full'>
      <div className='flex items-center justify-between p-4 bg-gray-100 rounded'>
        <div className='flex items-center gap-4'>
          <img
            className='w-12 h-12 rounded-full'
            src='thispersondoesnotexist.com'
            alt='Profile Picture'
          />
          <div>
            <h2 className='text-lg'>John Doe</h2>
            <p className='text-sm'>ID: 123456</p>
            <p className='text-sm'>Level: 1</p>
            <p className='text-sm'>Nationality: Egypt</p>
          </div>
        </div>
      </div>
    </div>
  );
}
