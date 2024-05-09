"use client";
import { useState } from "react";
import Button from "./Button";
import { useFormState } from "react-dom";
import { rejectServiceRequestAction } from "@/app/[locale]/(authenticated)/students/requests/action";

export default function RejectButtonModal({ data }: { data: any }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [state, formAction] = useFormState(rejectServiceRequestAction, null);

  return (
    <>
      <Button variant='danger' onClick={() => setIsOpenModal(true)}>
        Reject
      </Button>

      {
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
            isOpenModal ? "block" : "hidden"
          }`}
        >
          <div className='bg-white p-4 rounded-lg'>
            <h2 className='text-lg font-bold'>Reject Service Request</h2>
            <form action={formAction}>
              <input name='message' type='text' placeholder='Message' />
              <input name='id' type='hidden' value={data} />
              <div className='flex justify-between'>
                <Button
                  onClick={() => {
                    setIsOpenModal(false);
                  }}
                  variant='secondary'
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenModal(false);
                  }}
                  type='submit'
                  variant='danger'
                >
                  Reject
                </Button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}
