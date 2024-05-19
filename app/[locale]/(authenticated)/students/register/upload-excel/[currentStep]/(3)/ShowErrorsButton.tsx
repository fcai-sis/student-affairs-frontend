"use client";

import Button from "@/components/Button";
import { H4, P } from "@/components/H";
import { LongArrowUpRightIcon } from "@/components/icons";
import { useState } from "react";

export type MappingError = { row: number; errors: string[] };

type ShowErrorsButtonProps = {
  mappingErrors: MappingError[];
};

export default function ShowErrorsButton({ mappingErrors }: ShowErrorsButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const showErrorsButton = "عرض الأخطاء";
  return (
    <>
      <Button
        type='button'
        onClick={() => setIsOpenModal(true)}
        variant="danger"
      >
        {showErrorsButton}
      </Button>
      <MappingErrorsModal
        isOpen={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        errors={mappingErrors}
      />
    </>
  );
}


type MappingErrorsModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  errors: { row: number; errors: string[] }[];
};

const MappingErrorsModal = ({ isOpen, onCancel, errors }: MappingErrorsModalProps) => {
  const backButton = "رجوع";
  const heading = "عرض الأخطاء";

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className='fixed inset-0 bg-black bg-opacity-50' />
      <div className='fixed inset-0 flex justify-center items-center'>
        <div className='bg-slate-100 p-4 rounded-lg flex flex-col items-center gap-4 shadow-md w-[400]'>
          <H4>{heading}</H4>
          <div className='flex flex-col gap-4 overflow-y-auto max-h-96'>
            {
              // for each row, show the errors
              errors.map(({ row, errors }) => (
                <div key={row} className='flex flex-col gap-2 bg-slate-100 p-2 rounded-lg'>
                  <P className='font-bold'>الصف {row}</P>
                  <ul className='list-disc list-inside'>
                    {
                      // JSON.stringify(errors)
                      errors.map((error, i) => <li key={i} className="text-red-500">{error}</li>)
                    }
                  </ul>
                </div>
              ))
            }
          </div>
          <Button
            type='button'
            onClick={onCancel}
            variant='secondary'
            icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
          >
            {backButton}
          </Button>
        </div>
      </div>
    </div >
  );
};
