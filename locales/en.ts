// locales/en.ts
export default {
  general: {
    loading: "Loading...",
    submit: "Submit",
    ok: "OK",
    cancel: "Cancel",
    back: "Back",
    error: {
      somethingWentWrong: "Something went wrong",
    },
  },
  nav: {
    home: "Home",
    students: "Students",
    announcements: "Announcements",
    serviceRequests: "Service Requests",
    profile: "Profile",
    signOut: "Sign Out",
    more: "More",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
  },
  auth: {
    title: "Login",
    username: "Username",
    password: "Password",
    login: "Login",
    success: "Successfully signed in",
    error: {
      invalidCredentials: "Invalid credentials",
    },
  },
  home: {
    title: "Home",
    welcome: "Welcome",
    search: "Search",
    searchPlaceholder: "Search for something",
    announcements: "Announcements",
    viewAllAnnouncements: "View All Announcements",
    serviceRequests: "Service Requests",
    viewAllServiceRequests: "View All Service Requests",
  },
  students: {
    title: "Students",
    noStudents: "No students",
    registerStudent: "Register Student",
  },
  registerStudent: {
    title: "Register Student",
    manual: {
      title: "Manual Student Registration",
    },
    upload: {
      title: "Register Students from Excel File",
      uploadExcelFile: "Upload File",
      success: "File uploaded successfully",
      mapping: {
        title: "Map Columns",
        instructions:
          "Map the columns in the Excel file to the fields in the database",
        unset: "Select a field",
        success: {
          updateField: "Field mapping updated successfully",
          cancel: "Registration session cancelled successfully",
        },
        error: {
          missingColumns: "Please map all columns",
          updateFailed: "Failed to update field mapping",
          cancelFailed: "Failed to cancel registration session",
        },
      },
      commit: {
        title: "Commit Registration Session",
        success: "Registration session committed successfully",
        error: {
          commitFailed: "Failed to commit registration session",
          row: "Failed to commit row {rowNumber}",
        },
      },
    },
  },
  announcements: {
    title: "Announcements",
    noAnnouncements: "No announcements",
    create: {
      title: "Create Announcement",
      form: {
        title: "Title",
        content: "Content",
        severity: "Severity",
        info: "Info",
        warning: "Warning",
        danger: "Danger",
        departments: "Departments",
        levels: "Levels",
      },
      success: "Announcement created successfully",
      error: {
        createFailed: "Failed to create announcement",
      },
    },
  },
  serviceRequests: {
    title: "Service Requests",
    empty: "No service requests",
    createServiceRequest: "Create Service Request",
  },
  profile: {
    title: "Profile",
    name: "Name",
    email: "Email",
    updating: "Updating...",
    update: "Update",
    success: "Profile updated successfully",
    error: {
      updateFailed: "Failed to update profile",
    },
  },
} as const;
