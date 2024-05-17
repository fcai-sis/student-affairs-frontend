"use client";

import Button from "@/components/Button";
import { LongArrowUpRightIcon } from "@/components/icons";
import { SubmitButton } from "@/components/SubmitButton";
import { useFormState } from "react-dom";
import { commitSession } from "./dummy-action";
import toast from "react-hot-toast";

export default function CommitForm() {
  const confirmButtonText = "تأكيد";
  const backButtonText = "رجوع";
  const [state, formAction] = useFormState(commitSession, null);

  return (
    <form action={formAction}>
      <div className='flex gap-2'>
        <Button
          asLink
          myHref='/students/register/upload-excel/2'
          variant='secondary'
          icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
        >
          {backButtonText}
        </Button>
        <Button
          type='submit'
          variant='primary'
          onClick={() => {
            if (state?.success) {
              toast.success("تم تسجيل الطلاب بنجاح");
            } else {
              toast.error("حدث خطأ أثناء تسجيل الطلاب");
            }
          }}
        >
          {confirmButtonText}
        </Button>
      </div>
    </form>
  );
}
