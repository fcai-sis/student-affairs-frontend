"use client";

import Button from "@/components/Button";
import { LongArrowUpRightIcon } from "@/components/icons";
import { SubmitButton } from "@/components/SubmitButton";

export default function CommitForm() {
  const confirmButtonText = "تأكيد";
  const backButtonText = "رجوع";

  return (
    <div className='flex gap-2'>
      <Button
        asLink
        myHref="/students/register/upload-excel/2"
        variant='secondary'
        icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
      >
        {backButtonText}
      </Button>
      <SubmitButton>
        {confirmButtonText}
      </SubmitButton>
    </div>
  );
}
