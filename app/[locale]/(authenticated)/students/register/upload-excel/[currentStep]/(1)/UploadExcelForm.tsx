"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { P } from "@/components/H";
import Button, { buttonClassName } from "@/components/Button";
import {
  CheckCircleSolidIcon,
  NavArrowLeftIcon,
  UploadIcon,
  XmarkCircleSolidIcon,
} from "@/components/icons";
import uploadFileAction from "./action";
import { useRouter } from "next/navigation";

export type UploadExcelFormState = {
  uploaded: boolean;
  error?: string;
};

export default function UploadExcelForm() {
  console.log("UploadExcelForm");
  const continueButtonText = "متابعة";

  const router = useRouter();

  const [file, setFile] = useState<string | null>(null);
  const [state, formAction] = useFormState(uploadFileAction, {
    uploaded: false,
  });

  useEffect(() => {
    if (state.uploaded) router.push("/students/register/upload-excel/2");
  }, [state]);

  return (
    <form
      className="w-min h-min flex flex-col items-center gap-8"
      action={formAction}
    >
      <label className={buttonClassName("secondary")} htmlFor="file">
        {"اختر ملف"}
        <UploadIcon className="stroke-slate-400" />
      </label>
      <input
        hidden
        id="file"
        name="file"
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          const filename = e.target.files && e.target.files[0].name;
          if (filename) {
            setFile(filename);
          }
        }}
      />
      <div className="flex gap-2 justify-center">
        {file ? (
          <P className="text-slate-500 whitespace-nowrap">{file}</P>
        ) : (
          <P className="text-slate-400 font-bold whitespace-nowrap">
            {"لم تقم باختيار ملف بعد"}
          </P>
        )}
        {file ? (
          <CheckCircleSolidIcon className="fill-green-500" />
        ) : (
          <XmarkCircleSolidIcon className="fill-red-500" />
        )}
      </div>
      {state.error && (
        <P className="font-bold text-red-500 w-96 text-center">{state.error}</P>
      )}
      <div className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          icon={<NavArrowLeftIcon className="stroke-slate-50" />}
        >
          {continueButtonText}
        </Button>
      </div>
    </form>
  );
}
