import { readActiveRegistrationSessionMappedStudents } from "@/app/api";
import FailureForm from "./FailureForm";
import SuccessForm from "./SuccessForm";
import { precommitRegistrationSession } from "./action";
import { ensureActiveRegistrationSession } from "../../../lib";

export default async function ReviewAndConfirm() {
  console.log("ReviewAndConfirm");
  await ensureActiveRegistrationSession();
  const lastPrecommitWasSuccessful = await readActiveRegistrationSessionMappedStudents();

  if (lastPrecommitWasSuccessful)
    return <SuccessForm />;

  const precommitResponse = await precommitRegistrationSession();

  if (precommitResponse.success)
    return <SuccessForm />;

  if (precommitResponse.reason === "conflict")
    return <p>conflict</p>

  return <FailureForm mappingErrors={precommitResponse.errors} />
}
