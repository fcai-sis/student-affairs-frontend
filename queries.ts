import {
  announcementsAPI,
  coursesAPI,
  departmentsAPI,
  graduationAPI,
  hallSlotAPI,
  serviceRequestsAPI,
  studentsAPI,
} from "./api";
import { getAccessToken } from "./lib";

export type Pagination = {
  page: number;
  limit: number;
};

export type Paginable = Partial<Pagination>;

export const getAllCourses = async () => {
  const accessToken = await getAccessToken();

  const response = await coursesAPI.get(`/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch courses");
  return response.data;
};

export const getAnnouncements = async ({ page, limit }: Paginable) => {
  const response = await announcementsAPI.get("/", {
    params: {
      page,
      limit,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch announcements");
  return response.data;
};

export const getServiceRequests = async ({
  page,
  limit,
  status,
}: Paginable & {
  status?: string;
}) => {
  const accessToken = await getAccessToken();
  const response = await serviceRequestsAPI.get("/", {
    params: {
      page,
      limit,
      status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200)
    throw new Error("Failed to fetch service requests");

  return response.data;
};

export const getAllDepartments = async () => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get(`/all`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch departments");
  return response.data;
};

export const getDepartments = async ({ page, limit }: Paginable) => {
  const accessToken = await getAccessToken();
  const response = await departmentsAPI.get("/", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch departments");
  return response.data;
};

export const getGraduationProjectEnrollments = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-enrolls`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return {
      enrollments: [],
    };
  }

  return response.data;
};

export const getGraduationProjectTeachings = async () => {
  const accessToken = await getAccessToken();

  const response = await graduationAPI.get(`/grad-teachings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.status, response.data);

  if (response.status !== 200) {
    return {
      instructorTeachings: [],
      taTeachings: [],
    };
  }

  return response.data;
};

export const getServiceRequestById = async (id: string) => {
  const accessToken = await getAccessToken();

  const response = await serviceRequestsAPI.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200)
    throw new Error("Failed to fetch service request");

  return response.data;
};

export const getStudents = async ({
  page,
  limit,
  level,
  department,
  query,
  gender,
}: Paginable & {
  level?: string;
  department?: string;
  query?: string;
  gender?: string;
}) => {
  const accessToken = await getAccessToken();
  const response = await studentsAPI.get("/", {
    params: { page, limit, department, level, query, gender },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch students");

  return response.data;
};

export const getStudent = async (studentId: string) => {
  const accessToken = await getAccessToken();

  const response = await studentsAPI.get(`/${studentId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch student");

  return response.data;
};

export const getHalls = async () => {
  const accessToken = await getAccessToken();

  const response = await hallSlotAPI.get(`/hall/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) throw new Error("Failed to fetch halls");

  return response.data;
};
