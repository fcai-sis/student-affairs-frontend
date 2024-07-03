"use server";

import { studentRegistrationAPI } from "@/api";
import { getAccessToken } from "@/lib";

export async function updateMapping({
  fieldName,
  value,
}: {
  fieldName: string;
  value: string;
}) {
  const accessToken = await getAccessToken();
  const response = await studentRegistrationAPI.patch(
    "/mapping",
    {
      mapping: {
        [fieldName]: value,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  return { success: true };
}

export async function cancelRegistrationSession() {
  const accessToken = await getAccessToken();
  const response = await studentRegistrationAPI.post(
    "/cancel",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: response.data.errors
          .map((error: any) => error.message)
          .join(", "),
      },
    };
  }

  return { success: true };
}

export async function precommitSession() {
  const accessToken = await getAccessToken();
  const response = await studentRegistrationAPI.post(
    "/precommit",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        errors: response.data.errors,
      },
    };
  }

  return { success: true };
}

export async function commitSession() {
  const accessToken = await getAccessToken();
  const response = await studentRegistrationAPI.post(
    "/commit",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: "Failed to commit registration session",
      },
    };
  }

  return { success: true };
}
