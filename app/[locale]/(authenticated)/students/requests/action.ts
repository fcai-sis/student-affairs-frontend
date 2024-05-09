"use server";
import { PAGE_SIZE } from "@/app/[locale]/students/constants";
export async function readServiceRequests() {
  const response = await fetch(
    `http://127.0.0.1:3000/service/read?page=1&pageSize=10`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const requestData = await response.json();

  const studentServiceRequests = requestData.serviceRequests;
  const currentPage = requestData.page;
  const pageSize = requestData.pageSize;
  console.log("Student Requests", studentServiceRequests);
  console.log("Current Page", currentPage);
  console.log("Page Size", pageSize);

  if (response.status === 200) {
    return {
      studentServiceRequests,
      currentPage,
      pageSize,
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
