"use client";
import { useState } from "react";
import Button from "./Button";
import { useFormState } from "react-dom";
import { acceptServiceRequestAction } from "@/app/[locale]/(authenticated)/students/requests/action";

export default function AcceptButtonModal({ data }: { data: any }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [state, formAction] = useFormState(acceptServiceRequestAction, null);

  return (
    <>
      <Button variant='primary' onClick={() => setIsOpenModal(true)}>
        Accept
      </Button>

      {
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
            isOpenModal ? "block" : "hidden"
          }`}
        >
          <div className='bg-white p-4 rounded-lg'>
            <h2 className='text-lg font-bold'>Accept Service Request</h2>
            <form action={formAction}>
              <input name='message' type='text' placeholder='Message' />
              <input name='claimAt' type='datetime-local' />
              <input name='id' type='hidden' value={data} />
              <div className='flex justify-between'>
                <Button
                  onClick={() => {
                    setIsOpenModal(false);
                  }}
                  variant='danger'
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenModal(false);
                  }}
                  type='submit'
                  variant='primary'
                >
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
}
