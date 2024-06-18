"use server";

import { serviceRequestsAPI } from "@/api";
import { getAccessToken } from "@/lib";

export async function acceptServiceRequest(
  serviceRequestId: string,
  claimAt: Date
) {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.patch(
    `/accept/${serviceRequestId}`,
    {
      claimAt,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log(response.data);

  if (response.status !== 200) {
    return {
      success: false,
      error: {
        message: "Failed to accept service request",
      },
    };
  }

  return { success: true };
}

export async function rejectServiceRequest(
  serviceRequestId: string,
  message: string
) {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.patch(
    `/reject/${serviceRequestId}`,
    {
      message,
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
        message: "Failed to reject service request",
      },
    };
  }

  return { success: true };
}

export async function completeServiceRequest(serviceRequestId: string) {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.patch(
    `/complete/${serviceRequestId}`,
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
        message: "Failed to complete service request",
      },
    };
  }

  return { success: true };
}
