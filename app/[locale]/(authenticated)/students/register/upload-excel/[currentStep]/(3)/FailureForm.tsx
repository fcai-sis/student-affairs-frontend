import { LongArrowUpRightIcon, XmarkCircleSolidIcon } from "@/components/icons";
import { H4, P } from "@/components/H";
import Button from "@/components/Button";
import ShowErrorsButton, { MappingError } from "./ShowErrorsButton";

type FailureFormProps = {
  mappingErrors: MappingError[];
};

export default function FailureForm({ mappingErrors }: FailureFormProps) {
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
