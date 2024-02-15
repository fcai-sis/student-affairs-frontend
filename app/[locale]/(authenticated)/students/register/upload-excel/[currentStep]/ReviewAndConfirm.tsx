import { readActiveRegistrationSession } from "@/app/api";
import dummyEndpoint from "./dummy-action";
import CommitForm from "./commitForm";

export default async function ReviewAndConfirm() {
  const activeRegistrationSession = await readActiveRegistrationSession();
  if (!activeRegistrationSession)
    return <div>No active registration session</div>;

  const isValidMapping = await dummyEndpoint(2000);
  // check the type of error, if it's a mapping error, display "Invalid Mapping" div
  // if it's an interal server error, display "Internal Server Error" div
  // not much to do here logic-wise i guess

  return (
    <div>
      <div>
        <h1>Review and Confirm</h1>
      </div>
      {isValidMapping && (
        <div>
          <h2>Mapping is valid</h2>
          <CommitForm />
        </div>
      )}
    </div>
  );
}
