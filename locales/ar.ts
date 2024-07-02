// locales/ar.ts
export default {
  general: {
    loading: "جاري التحميل...",
    submit: "إرسال",
    ok: "موافق",
    confirm: "تأكيد",
    cancel: "إلغاء",
    back: "رجوع",
    error: {
      somethingWentWrong: "حدث خطأ ما",
    },
  },
  nav: {
    home: "الصفحة الرئيسية",
    students: "الطلاب",
    announcements: "الإعلانات",
    serviceRequests: "طلبات الخدمة",
    profile: "الملف الشخصي",
    signOut: "تسجيل الخروج",
    more: "المزيد",
  },
  pagination: {
    previous: "السابق",
    next: "التالي",
  },
  auth: {
    title: "تسجيل الدخول",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    success: "تم تسجيل الدخول بنجاح",
    error: {
      invalidCredentials: "بيانات الاعتماد غير صحيحة",
    },
  },
  home: {
    title: "الصفحة الرئيسية",
    welcome: "مرحبًا",
    search: "بحث",
    searchPlaceholder: "ابحث عن شيء",
    announcements: "الإعلانات",
    viewAllAnnouncements: "عرض جميع الإعلانات",
    serviceRequests: "طلبات الخدمة",
    viewAllServiceRequests: "عرض جميع طلبات الخدمة",
  },
  students: {
    title: "الطلاب",
    noStudents: "لا يوجد طلاب",
    registerStudent: "تسجيل طالب",
  },
  registerStudent: {
    title: "تسجيل طالب",
    manual: {
      title: "تسجيل طالب يدويًا",
    },
    upload: {
      title: "تسجيل الطلاب من ملف Excel",
      uploadExcelFile: "تحميل الملف",
      success: "تم تحميل الملف بنجاح",
      mapping: {
        title: "تعيين الأعمدة",
        instructions:
          "قم بتعيين الأعمدة في ملف Excel إلى الحقول في قاعدة البيانات",
        unset: "اختر الحقل",
        success: {
          updateField: "تم تحديث تعيين الحقل بنجاح",
          cancel: "تم إلغاء جلسة التسجيل بنجاح",
        },
        error: {
          missingFields: "الرجاء تعيين جميع الحقول",
          updateFailed: "فشل تحديث تعيين الحقل",
          cancelFailed: "فشل إلغاء جلسة التسجيل",
        },
      },
      commit: {
        title: "تأكيد التسجيل",
        success: "تم تسجيل الطلاب بنجاح",
        error: {
          commitFailed: "فشل تأكيد التسجيل",
          row: "فشل تأكيد الصف {rowNumber}",
        },
      },
    },
  },
  announcements: {
    title: "الإعلانات",
    noAnnouncements: "لا توجد إعلانات",
    create: {
      title: "إنشاء إعلان",
      form: {
        title: "العنوان",
        content: "المحتوى",
        severity: "الاهمية",
        info: "معلومات",
        warning: "تحذير",
        danger: "خطر",
        departments: "الأقسام",
        levels: "المستويات",
      },
      success: "تم إنشاء الإعلان بنجاح",
      error: {
        createFailed: "فشل إنشاء الإعلان",
      },
    },
  },
  serviceRequests: {
    title: "طلبات الخدمة",
    empty: "لا توجد طلبات خدمة",
    createServiceRequest: "إنشاء طلب خدمة",
  },
} as const;
