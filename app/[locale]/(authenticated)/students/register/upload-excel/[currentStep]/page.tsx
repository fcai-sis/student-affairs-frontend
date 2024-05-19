import { ensureAuthenticated } from "@/lib";
import UploadExcel from "./(1)/UploadExcel";
import Mapping from "./(2)/Mapping";
import ReviewAndConfirm from "./(3)/ReviewAndConfirm";

export default async function Page({
  params: { currentStep },
}: {
  params: { currentStep: string };
}) {
  console.log("UPLOAD EXCEL PAGE");

  await ensureAuthenticated();

  const step = parseInt(currentStep, 10);
  switch (step) {
    case 1:
      return <UploadExcel />;
    case 2:
      return <Mapping />;
    case 3:
      return <ReviewAndConfirm />;
    default:
      return <div>Invalid step</div>;
  }
}
