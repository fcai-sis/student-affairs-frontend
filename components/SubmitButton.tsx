import { useFormStatus } from "react-dom";
import { NavArrowLeftIcon } from "./icons";
import Button from "./Button";
import { PropsWithChildren } from "react";

export function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      variant='primary'
      disabled={pending}
      icon={
        <NavArrowLeftIcon
          className={pending ? "stroke-slate-400" : "stroke-slate-50"}
        />
      }
    >
      {children}
    </Button>
  );
}
