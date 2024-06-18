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
        message: "Failed to update mapping",
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
        message: "Failed to cancel registration session",
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
    const errorCode = response.data.code;
    return {
      success: false,
      error: {
        message:
          errorCode === "unset-fields-in-mapping"
            ? "Unset fields in mapping"
            : errorCode === "error-saving-mapped-students"
            ? "Error saving mapped students"
            : "Failed to precommit registration session",
        issues:
          errorCode === "error-saving-mapped-students"
            ? response.data.errors
            : undefined,
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
