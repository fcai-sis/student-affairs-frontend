import { redirect } from "next/navigation";

import { H1 } from "@/components/H";
import Stepper from "@/components/Stepper";
import UploadExcel from "./UploadExcel";
import Mapping from "./Mapping";
import ReviewAndConfirm from "./ReviewAndConfirm";

export default function PageWithStepper({ params: { currentStep } }: { params: { currentStep: string } }) {
  const step = parseInt(currentStep, 10);

  if (step < 1 || step > 3) {
    redirect("/students/register/");
  }

  const pageTitle = "تسجيل طلاب من ملف التنسيق";

  const stepHref = (step: number) => `/students/register/upload-excel/${step}`;

  return (
    <div className="flex flex-col items-center gap-16 w-min h-min">
      <div className="flex flex-row w-[900px] h-min">
        <H1>{pageTitle}</H1>
      </div>
      <div className="flex flex-col items-center gap-8 w-min h-min">
        <div className="flex flex-col items-center gap-8 w-min h-min">
          <Stepper currentStep={step} />
        </div>
        <Page step={step} />
      </div>
    </div >
  );
}

function Page({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <UploadExcel />;
    case 2:
      return <Mapping />;
    case 3:
      return <ReviewAndConfirm />;
  }
}
