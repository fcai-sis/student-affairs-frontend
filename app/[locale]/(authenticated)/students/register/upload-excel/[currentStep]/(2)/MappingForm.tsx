"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/Button";
import { LongArrowUpRightIcon } from "@/components/icons";
import { H4, P } from "@/components/H";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { cancelSessionAction, validateMapping } from "./action";
import { useRouter } from "next/navigation";

export default function MappingForm({
  headers,
  mapping,
  arabicFields,
}: {
  headers: string[];
  mapping: { [key: string]: string };
  arabicFields: { [key: string]: string };
}) {
  console.log("MappingForm");
  const backButtonText = "رجوع";
  const continueButtonText = "متابعة";

  // Headers is an array of strings that represent the headers of the excel file
  // Mapping is an object with field names as keys
  const mappingKeys = Object.keys(mapping);
  const [state, formAction] = useFormState(validateMapping, null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state?.done) {
      router.push("/students/register/upload-excel/3");
    }
  }, [state]);

  return (
    <>
      <form
        action={formAction}
        className='w-min h-min flex flex-col justify-center items-center gap-4'
      >
        <div className='flex flex-col overflow-auto h-52 gap-2 p-2 rounded-lg border-2 border-slate-200 shadow-lg'>
          {mappingKeys.map((field, _) => (
            <div className='flex justify-between' key={field}>
              <label className='w-32 h-max p-2 font-bold' htmlFor={field}>
                {arabicFields[field]}
              </label>
              <select
                required={true}
                name={field}
                defaultValue={mapping[field]}
                className={
                  state?.error?.fields?.includes(field)
                    ? "border-2 rounded-lg p-1 border-red-500 transition-all duration-200 w-max"
                    : "rounded-lg w-max"
                }
              >
                <option disabled={true} value='<unset>'>
                  Select the column that this field represents
                </option>
                {headers.map((header, index) => (
                  <option key={`${field}-option-${index}`} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className='flex gap-2'>
          <Button
            type='button'
            onClick={() => setIsOpenModal(true)}
            variant='secondary'
            icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
          >
            {backButtonText}
          </Button>
          <SubmitButton>{continueButtonText}</SubmitButton>
        </div>
      </form>
      <CancelSessionModal
        isOpen={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      />
    </>
  );
}

type CancelSessionModalProps = {
  isOpen: boolean;
  onCancel: () => void;
};

const CancelSessionModal = ({ isOpen, onCancel }: CancelSessionModalProps) => {
  const cancelButtonText = "لا، أريد متابعة العملية الحالية";

  const heading = "متأكد أنك تريد الرجوع؟";
  const body =
    "الرجوع إلى خطوة رفع الملف سيلغي العملية الحالية ويمحي أي تعديلات قمت بها على الربطة بقاعدة البيانات. هل أنت متأكد؟";

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className='fixed inset-0 bg-black bg-opacity-50' />
      <div className='fixed inset-0 flex justify-center items-center'>
        <div className='bg-slate-100 p-4 rounded-lg flex flex-col items-center gap-4 shadow-md w-min'>
          <H4>{heading}</H4>
          <P className='w-max'>{body}</P>
          <form className='flex gap-4 w-max' action={cancelSessionAction}>
            <Button variant='secondary' type='button' onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <ConfirmCancelButton />
          </form>
        </div>
      </div>
    </div>
  );
};

function ConfirmCancelButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' variant='danger' disabled={pending}>
      {pending ? "جاري الإلغاء..." : "نعم، أريد إلغاء العملية والبدء من جديد"}
    </Button>
  );
}
