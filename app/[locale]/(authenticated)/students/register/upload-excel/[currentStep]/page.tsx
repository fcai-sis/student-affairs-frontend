import UploadExcel from "./UploadExcel";
import Mapping from "./Mapping";
import ReviewAndConfirm from "./ReviewAndConfirm";


export default function Page({ params: { currentStep } }: { params: { currentStep: string } }) {
  const step = parseInt(currentStep, 10);
  switch (step) {
    case 1:
      return <UploadExcel />;
    case 2:
      return <Mapping />;
    case 3:
      return <ReviewAndConfirm />;
  }
}
