"use client";

import toast from "react-hot-toast";
import { DeleteBtn } from "../read-students/action-btn";
import deleteStudent from "./delete-api";
import { TODO } from "../register/manual/TODO";

export const DeleteStudentForm = ({ id }: { id: string }) => {
  const handleDeleteStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    const response: TODO = await deleteStudent(id);
    console.log(response);

    if (!response?.error) {
      toast.success(`${response.fullName} deleted successfully`);
    } else {
      toast.error(response.error);
    }
  };

  return (
    <form onSubmit={handleDeleteStudent}>
      <input type="hidden" name="_id" value={id} />
      <DeleteBtn />
    </form>
  );
};
