import { updateStudent } from "../action";
import fetchStudentData from "../api";

import EditStudentForm from "../EditStudentForm";

export default async function Page({ params }: { params: any }) {
  // Fetch the student data from the server
  const data = await fetchStudentData(params.id);
  const updateAction = updateStudent.bind(null, params.id);
  console.log("FETCHED STUDENT DATA", data);

  return <EditStudentForm student={data} updateStudentAction={updateAction} />;
}
