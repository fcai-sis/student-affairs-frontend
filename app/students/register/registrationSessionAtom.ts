import { atom } from "jotai";

const registrationSessionAtom = atom({
  startDate: null,
  excelColumnsHeaders: [],
  mapping: {},
  stagedStudents: [],
});

export default registrationSessionAtom;
