"use server";

import { PAGE_SIZE } from "@/app/[locale]/(authenticated)/students/manual-register/constants";
import { getAccessToken } from "@/lib";

export async function readServiceRequests(page: number) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `http://127.0.0.1:3010/service/read?page=${page}&pageSize=${PAGE_SIZE}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const requestData = await response.json();

  const studentServiceRequests = requestData.serviceRequests;
  const currentPage = requestData.page;
  const pageSize = requestData.pageSize;
  const totalPages = requestData.totalServiceRequests;

  console.log("Student Requests", studentServiceRequests);
  console.log("Current Page", currentPage);
  console.log("Page Size", pageSize);
  console.log("Total Pages", totalPages);

  if (response.status === 200) {
    return {
      studentServiceRequests,
      currentPage,
      pageSize,
      totalPages,
    };
  } else if (response.status == 400) {
    return requestData.error;
  }

  return {
    studentServiceRequests: [],
    currentPage,
    pageSize,
  };
}

export async function acceptServiceRequestAction(_: any, formData: FormData) {
  const accessToken = await getAccessToken();
  const claimDate = formData.get("claimAt")?.toString() ?? "";
  const cleanedFormData = {
    id: formData.get("id"),
    message: formData.get("message"),
    claimAt: claimDate.length > 0 ? new Date(claimDate).toISOString() : "",
  };

  // convert the claimAt date to ISO 8601 format
  console.log("Cleaned Form Data", cleanedFormData);

  const response = await fetch(
    `http://127.0.0.1:3000/service/accept/${cleanedFormData.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(cleanedFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  const serviceRequest = data.service;

  console.log("Service Request", serviceRequest);
  console.log("Response", response.status);

  if (response.status === 200) {
    return {
      serviceRequest,
    };
  } else if (response.status == 400) {
    return data.error;
  }

  return {
    error: {
      message: "Error accepting service request",
    },
  };
}

export async function rejectServiceRequestAction(_: any, formData: FormData) {
  const accessToken = await getAccessToken();
  const cleanedFormData = {
    id: formData.get("id"),
    message: formData.get("message"),
  };

  // convert the claimAt date to ISO 8601 format
  console.log("Cleaned Form Data", cleanedFormData);

  const response = await fetch(
    `http://127.0.0.1:3000/service/reject/${cleanedFormData.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(cleanedFormData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  const serviceRequest = data.service;

  console.log("Service Request", serviceRequest);
  console.log("Response", response.status);

  if (response.status === 200) {
    return {
      serviceRequest,
    };
  } else if (response.status == 400) {
    return data.error;
  }

  return {
    error: {
      message: "Error rejecting service request",
    },
  };
}
