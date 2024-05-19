"use client";

import { useState } from "react";
import FailureForm from "./FailureForm";
import SuccessForm from "./SuccessForm";
import { precommitRegistrationSession } from "./action";



export default function DummyButton() {
  const [precommitResponse, setPrecommitResponse] = useState<any>(null);

  const handleClick = async () => {
    const res = await precommitRegistrationSession();
    setPrecommitResponse(res);
  };

  if (!precommitResponse)
    return (
      <button onClick={handleClick}>
        {"Dummy Button"}
      </button>
    );
  if (precommitResponse.success)
    return <SuccessForm />;
  else
    return <FailureForm mappingErrors={precommitResponse.errors} />
}
