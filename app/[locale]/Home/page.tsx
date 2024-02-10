import Link from "next/link";

export default function Home() {
  return (
    <div className='w-max h-min gap-16 flex-col items-center flex'>
      <div className='w-max h-min gap-8 flex flex-col'>
        <p className='w-max h-min text-left flex'>Global Search</p>
        <div>
          <p>Search Component</p>
        </div>
      </div>

      {/* Services */}
      <div>
        <div>
          <div>
            <p>Service</p>
          </div>
          <div>
            {/* Replace this paragraph with the card component */}
            <div className='max-w-sm rounded overflow-hidden shadow-lg'>
              <div className='px-6 py-4'>
                <div className='font-bold text-xl mb-2'>
                  <p>Ethbat Keed</p>
                </div>
                <div>
                  <p className='text-gray-700 text-base'>
                    Amr Ibrahim Mohamed Ibrahim Sayed
                  </p>
                  <p className='text-gray-700 text-base'>20200366</p>
                </div>
              </div>
              <div className='px-6 py-4 flex justify-between items-center'>
                <p className='text-gray-600 text-sm '>20/12/2022-12:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcemnet */}
      <div>
        <div>
          <div>
            <p>Announcements</p>
          </div>
          <div>
            {/* Replace this paragraph with the card component */}
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-blue-300'>
              <div className='px-6 py-4'>
                <div>
                  <p className='text-gray-700 text-base'>
                    All Students are Dismissed All Students are Dismissed All
                    Students are Dismissed All Students are Dismissed
                  </p>
                </div>
              </div>
              <div className='px-6 py-4 flex justify-between items-center '>
                <p className='text-gray-600 text-sm '>20/12/2022-12:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
