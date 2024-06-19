import Link from "next/link";
import { z } from "zod";
import SelectSemesterForm from "./SelectSemesterForm";

export default async function Page() {
  return (
    <>
      <SelectSemesterForm />
    </>
  );
}
