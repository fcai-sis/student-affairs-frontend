import { H4, P } from "@/components/H";
import { CheckCircleSolidIcon, WarningTriangleIcon } from "@/components/icons";
import CommitForm from "./CommitForm";

export default function SuccessForm() {
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

