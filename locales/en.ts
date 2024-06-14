// locales/en.ts
export default {
  home: "Home",
  students: "Students",
  announcements: "Announcements",
  services: "Services",
  "Register Students": "Register Students",
  "Manual Registration": "Manual Registration",
  "Add a student manually": "Add a student manually",
  "Upload Excel": "Upload Excel",
  "Upload an excel file with student information":
    "Upload an excel file with student information.",
  "Please ensure that the student information is correct before uploading":
    "Please ensure that the student information is correct before uploading",
  welcome: "Hello {name}!",
  search: "Search",
  clickMe: "Click Me",
  username: "Username",
  usernameHint: "e.g. Ayman",
  password: "Password",
  passwordHint: "•••••••",
  login: "Login",
  employeeGateway: "Student Affairs Gateway",
  forFCAICU:
    "Faculty of Computers and Artificial Intelligence at Cairo University",
  fileError:
    "The file you chose is not an Excel file, please enter a valid Excel file (.xlsx or .xls)",
  excelRegistration: "Register Students from Excel File",
  uploadFile: "Upload File",
  mapping: "Database Mapping",
  reviewConfirm: "Review and Confirm",
  missingFile: "You haven't uploaded a file yet",
  continue: "Continue",
  cancel: "Cancel",
  confirm: "Confirm",
  back: "Back",
  selectColumn: "Select the column that this field represents",
  cancelMapTitle: "Are you sure you want to go back?",
  cancelMapDescription:
    "Going back to the file upload step will cancel the current process and erase any changes you made to the database mapping. Are you sure?",
  cancelMapConfirm: "Yes, I want to cancel the process and start over",
  cancelMapCancel: "No, I want to continue the current process",
  loadingMapping: "Validating database mapping...",
  mapSuccess: "Data mapped successfully",
  mapWarn:
    "Once you press “Confirm”, all students will be registered from the Excel file, based on the mapping you selected in the previous step",
} as const;
