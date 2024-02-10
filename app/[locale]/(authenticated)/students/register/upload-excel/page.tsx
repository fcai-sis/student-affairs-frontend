"use client";

import Button from "@/components/Button";
import { H1, H6 } from "@/components/H";
import { NavArrowLeftIcon } from "@/components/icons";
import { cn } from "@/lib";
import { ComponentProps, useState } from "react";

export default function Page() {
  const pageTitle = "تسجيل طلاب من ملف التنسيق";
  const continueButtonText = "متابعة";

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex flex-col items-center gap-16 w-min h-min">
      <div className="flex flex-row w-[900px] h-min">
        <H1>{pageTitle}</H1>
      </div>
      <div className="flex flex-col items-center w-min h-min gap-16">
        <div className="flex flex-col items-center gap-8 w-min h-min">
          <div className="flex flex-col items-center gap-8 w-min h-min">
            <Stepper currentStep={currentStep} />
          </div>
          <div className="flex flex-col gap-8 w-min h-min">

          </div>
        </div>
        <Button
          variant="primary"
          icon={
            <NavArrowLeftIcon className="stroke-slate-50" />
          }
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          {continueButtonText}
        </Button>
      </div>
    </div>
  );
}

type StepperProps = {
  currentStep: number;
}

function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex flex-row justify-center gap-16 w-[480px] h-min relative">
      <Step number={1} title={"رفع الملف"} done={currentStep > 1} active={currentStep === 1} />
      <StepLine className="rtl:right-[90px] ltr:left-[90px] top-7" done={currentStep > 1} />
      <Step number={2} title={"رفع الملف"} done={currentStep > 2} active={currentStep === 2} />
      <StepLine className="rtl:right-[250px] ltr:left-[250px] top-7" done={currentStep > 2} />
      <Step number={3} title={"رفع الملف"} done={currentStep > 3} active={currentStep === 3} />
    </div>
  );
}

type StepProps = {
  number: number;
  title: string;
  active: boolean;
  done: boolean;
}

function Step({ number, title, active, done }: StepProps) {
  const bgColor = active || done ? "bg-blue-500" : "bg-slate-300";
  const textColor = active || done ? "text-slate-50" : "text-slate-400";

  return (
    <div className="flex flex-col gap-2 w-[100px] h-min justify-start items-center z-10 transition-all duration-300">
      <div className={`flex flex-col w-[64px] h-[64px] ${bgColor} rounded-full justify-center items-center ${!active && "border-[5px] border-slate-100"} transition-all duration-300`}>
        <H6 className={`${textColor} transition-all duration-300`}>{number}</H6>
      </div>
      <H6 className={`w-max ${active || done ? "text-blue-500" : textColor} transition-all duration-300`}>{title}</H6>
    </div>
  );
}

type StepLineProps = {
  done?: boolean;
}

function StepLine({ done: active, className }: ComponentProps<"div"> & StepLineProps) {
  return (
    <div className={cn(`w-32 h-2 ${active ? "bg-blue-500" : "bg-slate-300"} rounded-full absolute z-0`, className)} />
  );
}
