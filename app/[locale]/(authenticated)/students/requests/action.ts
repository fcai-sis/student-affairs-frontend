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
