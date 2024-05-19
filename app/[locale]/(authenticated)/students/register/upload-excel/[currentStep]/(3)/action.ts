"use server";

import { getAccessToken } from "@/lib";
import { MappingError } from "./ShowErrorsButton";

export async function commitSession() {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/commit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // coolcool just send the data or the error if one occurs
  if (response.status !== 200) {
    const error = await response.json();
    console.error(error);
    return { success: false, errors: error.errors };
  }

  return {
    success: true,
  };
}

type PrecommitSessionState = {
  success: true;
  errors?: undefined;
} | (
    {
      success: false;
      reason: "failed";
      errors: MappingError[];
    } | {
      success: false;
      reason: "conflict";
      errors?: undefined;
    }
  );

export async function precommitRegistrationSession(): Promise<PrecommitSessionState> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/precommit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 409) {
    return { reason: "conflict", success: false };
  }

  if (response.status !== 200) {
    const error = await response.json();
    console.error(error);
    return { reason: "failed", success: false, errors: [] };
  }

  return { success: true };
}
