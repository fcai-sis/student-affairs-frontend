import { redirect } from "next/navigation";

export default () => {
  console.log("REDIRECT TO UPLOAD EXCEL PAGE 1");
  redirect('/students/register/upload-excel/1');
}
