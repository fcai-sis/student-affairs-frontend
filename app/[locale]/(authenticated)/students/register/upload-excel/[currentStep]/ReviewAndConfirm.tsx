import { readActiveRegistrationSession } from "@/app/api";
import CommitForm from "./commitForm";
import { redirect } from "next/navigation";
import { precommitRegistrationSession } from "./dummy-action";
import { CheckCircleSolidIcon, LongArrowUpRightIcon, WarningTriangleIcon, XmarkCircleSolidIcon } from "@/components/icons";
import { H4, P } from "@/components/H";
import Button from "@/components/Button";
import ShowErrorsButton, { MappingError } from "./ShowErrorsButton";

export default async function ReviewAndConfirm() {
  const activeRegistrationSession = await readActiveRegistrationSession();

  if (!activeRegistrationSession)
    redirect("/students/register/upload-excel/1");

  const precommitResponse = await precommitRegistrationSession();

  if (precommitResponse.success)
    return <SuccessForm />

  return <FailureForm mappingErrors={precommitResponse.errors} />
}

type WarningAlertProps = {
  message: string;
};

function WarningAlert({ message }: WarningAlertProps) {
  return (
    <div className="flex items-center justify-center bg-yellow-300 rounded-lg p-4 gap-2">
      <WarningTriangleIcon className="stroke-yellow-900 h-max w-max" />
      <P className="text-yellow-900 w-96 h-min">
        {message}
      </P>
    </div>
  )
}

function SuccessForm() {
  const successPageTitle = "تم ربط البيانات بنجاح";
  const successPageMessage = "بمجرد الضغط على “تأكيد” سيتم تسجيل جميع الطلاب بملف الإكسل، بناء على الربطة التي حددتها في الخطوة السابقة";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CheckCircleSolidIcon className="w-32 h-32 fill-green-500" />
      <H4>{successPageTitle}</H4>
      <WarningAlert message={successPageMessage} />
      <CommitForm />
    </div>
  );
}

type FailureFormProps = {
  mappingErrors: MappingError[];
};

function FailureForm({ mappingErrors }: FailureFormProps) {
  const errorPageTitle = "الربطة غير صحيحة";
  const errorPageMessage = "بعض صفوف الإكسل بها مشاكل في الربط بقاعدة البيانات";

  const backButton = "رجوع";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <XmarkCircleSolidIcon className="w-32 h-32 fill-red-500" />
      <H4>{errorPageTitle}</H4>
      <P className="font-bold text-red-500">{errorPageMessage}</P>
      <div className="flex items-center justify-center gap-4">
        <Button
          asLink
          myHref="/students/register/upload-excel/2"
          variant='secondary'
          icon={<LongArrowUpRightIcon className='stroke-slate-400' />}
        >
          {backButton}
        </Button>
        <ShowErrorsButton mappingErrors={mappingErrors} />
      </div>
    </div >
  );
}
