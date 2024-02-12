"use client";

import { useFormState } from "react-dom";

import Button, { buttonClassName } from "@/components/Button";
import { P } from "@/components/H";
import { CheckCircleSolidIcon, LongArrowUpRightIcon, NavArrowLeftIcon, UploadIcon, XmarkCircleSolidIcon } from "@/components/icons";
import { useState } from "react";
import uploadFileAction from "../../action";

export type UploadExcelFormState = {
  error?: string;
};

export default function UploadExcel() {
  const continueButtonText = "متابعة";
  const backButtonText = "رجوع";

  const [file, setFile] = useState<string | null>(null);

  const [state, formAction] = useFormState(uploadFileAction, {})

  return (
    <form
      className="w-min h-min flex flex-col items-center gap-8"
      action={formAction}
    >
      <label
        className={buttonClassName("secondary")}
        htmlFor="file"
      >
        {"اختر ملف"}
        <UploadIcon className="stroke-slate-400" />
      </label>
      <input
        hidden
        id="file"
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0].name;
          if (file) {
            setFile(file);
          }
        }}
      />
      <div className="flex gap-2 justify-center">
        {
          file ? (
            <P className="text-slate-500 whitespace-nowrap">
              {file}
            </P>
          )
            : (
              <P className="text-slate-400 font-bold whitespace-nowrap">
                {"لم تقم باختيار ملف بعد"}
              </P>
            )
        }
        {
          file
            ? (<CheckCircleSolidIcon className="fill-green-500" />)
            : (<XmarkCircleSolidIcon className="fill-red-500" />)
        }
      </div>
      {
        state.error &&
        (
          <P className="font-bold text-red-500 w-96 text-center">
            {state.error}
          </P>
        )
      }
      <div className="flex gap-2">
        {
          <Button
            variant="secondary"
            icon={<LongArrowUpRightIcon className="stroke-slate-400" />}>
            {backButtonText}
          </Button>
        }
        <Button
          type="submit"
          variant="primary"
          icon={<NavArrowLeftIcon className="stroke-slate-50" />}>
          {continueButtonText}
        </Button>
      </div>
    </form >
  );
}
