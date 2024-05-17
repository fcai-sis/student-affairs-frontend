import Link from "next/link";
import { OFFSET_NUMBER } from "@/app/[locale]/students/constants";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

  const pageNumbers = [];
  for (
    let i = currentPage - OFFSET_NUMBER;
    i <= currentPage + OFFSET_NUMBER;
    i++
  ) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  return (
    <div className='flex justify-center mt-8'>
      {currentPage === 1 ? (
        <div className='cursor-not-allowed opacity-50 px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-lg'>
          Previous
        </div>
      ) : (
        <Link
          className='px-4 py-2 mr-2 bg-blue-700 hover:bg-blue-900 text-white rounded-lg transition duration-300 ease-in-out'
          href={`/students/requests?page=${prevPage}`}
        >
          Previous
        </Link>
      )}

      <div className='flex space-x-2'>
        {pageNumbers.map((number, index) => (
          <Link
            key={index}
            href={`/students/requests?page=${number}`}
            className={
              number === currentPage
                ? " cursor-default px-4 py-2 bg-blue-500 text-white rounded-lg"
                : "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg transition duration-300 ease-in-out hover:bg-slate-600 hover:text-white"
            }
          >
            {number}
          </Link>
        ))}
      </div>

      {currentPage === totalPages ? (
        <div className='cursor-not-allowed opacity-50 px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-lg'>
          Next
        </div>
      ) : (
        <Link
          className='px-4 py-2 ml-2 bg-blue-700 hover:bg-blue-900 text-white rounded-lg transition duration-300 ease-in-out'
          href={`/students/requests?page=${nextPage}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}
