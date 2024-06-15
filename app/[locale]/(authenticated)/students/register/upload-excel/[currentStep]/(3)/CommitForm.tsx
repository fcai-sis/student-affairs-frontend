"use client";

import Button from "@/components/Button";
import { LongArrowUpRightIcon } from "@/components/icons";
import { useFormState } from "react-dom";
import { commitSession } from "./action";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CommitForm() {
  const confirmButtonText = "تأكيد";
  const backButtonText = "رجوع";
  const [state, formAction] = useFormState(commitSession, null);

  useEffect(() => {
    if (state?.errors) {
      toast.error("حدث خطأ أثناء تأكيد البيانات");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex gap-2">
        <Button
          asLink
          myHref="/students/register/upload-excel/2"
          variant="secondary"
          icon={<LongArrowUpRightIcon className="stroke-slate-400" />}
        >
          {backButtonText}
        </Button>
        <Button type="submit" variant="primary">
          {confirmButtonText}
        </Button>
      </div>
    </form>
  );
}
