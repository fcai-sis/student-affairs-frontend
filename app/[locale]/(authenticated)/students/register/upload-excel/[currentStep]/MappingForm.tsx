"use client";

import { useFormState } from "react-dom";
import validateMapping from "./map-action";
import Button from "@/components/Button";
import { LongArrowUpRightIcon, NavArrowLeftIcon } from "@/components/icons";
import { H2, H4, P } from "@/components/H";
import { useState } from "react";
import cancelSessionAction from "@/app/[locale]/(authenticated)/table/cancelAction";

export default function MappingForm({
  headers,
  mapping,
  arabicFields,
}: {
  headers: string[];
  mapping: { [key: string]: string };
  arabicFields: { [key: string]: string };
}) {
  const backButtonText = "رجوع";
  const continueButtonText = "متابعة";

  // Headers is an array of strings that represent the headers of the excel file
  // Mapping is an object with field names as keys
  const mappingKeys = Object.keys(mapping);
  const [state, formAction] = useFormState(validateMapping, null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <form action={formAction} className="w-min h-min flex flex-col justify-center items-center">
        <div className="flex flex-col overflow-auto h-52 gap-2">
          {mappingKeys.map((field, _) => (
            <div className="flex justify-between" key={field}>
              <label
                className="w-max h-max p-2"
                htmlFor={field}
              >
                {arabicFields[field]}
              </label>
              <select
                required={true}
                name={field}
                defaultValue={mapping[field]}
              >
                <option disabled={true} value='<unset>'>
                  Select the column that this field represents
                </option>
                {headers.map((header, index) => (
                  <option
                    key={`${field}-option-${index}`}
                    value={header}
                  >
                    {header}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => setIsOpenModal(true)}
            variant="secondary"
            icon={<LongArrowUpRightIcon className="stroke-slate-400" />}>
            {backButtonText}
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={<NavArrowLeftIcon className="stroke-slate-50" />}>
            {continueButtonText}
          </Button>
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
  const confirmButtonText = "نعم، أريد إلغاء العملية والبدء من جديد";
  const cancelButtonText = "لا، أريد متابعة العملية الحالية";

  const heading = "متأكد أنك تريد الرجوع؟";
  const body = "الرجوع إلى خطوة رفع الملف سيلغي العملية الحالية ويمحي أي تعديلات قمت بها على الربطة بقاعدة البيانات. هل أنت متأكد؟";

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg flex flex-col items-center gap-4 shadow-md w-min">
          <H4>{heading}</H4>
          <P className="w-max">{body}</P>
          <form className="flex gap-4 w-max" action={cancelSessionAction}>
            <Button variant="secondary" type="button" onClick={onCancel}>{cancelButtonText}</Button>
            <Button variant="danger" type="submit">{confirmButtonText}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
