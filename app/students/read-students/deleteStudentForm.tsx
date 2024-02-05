import { DeleteBtn } from "./action-btn";
import deleteStudent from "./delete-api";

//TODO: change to client side to add confirmation and stuff, probably for the best

export const DeleteStudentForm = ({ id }: { id: string }) => {
  return (
    <form action={deleteStudent}>
      <input type='hidden' name='_id' value={id} />
      <DeleteBtn />
    </form>
  );
};
