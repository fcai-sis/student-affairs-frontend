export function localizedLevel(level: number) {
  switch (level) {
    case 1:
      return {
        en: "Freshman",
        ar: "المستوى الأول",
      };
    case 2:
      return {
        en: "Sophomore",
        ar: "المستوى الثاني",
      };
    case 3:
      return {
        en: "Junior",
        ar: "المستوى الثالث",
      };
    case 4:
      return {
        en: "Senior",
        ar: "المستوى الرابع",
      };
    default:
      return {
        en: "Unknown",
        ar: "غير معروف",
      };
  }
}

// export function localizedSeverity(severity: AnnouncementSeverityEnumType) {
//   switch (severity) {
//     case AnnouncementSeveritiesEnum[0]:
//       return {
//         en: "Info",
//         ar: "معلومة",
//       };
//     case AnnouncementSeveritiesEnum[1]:
//       return {
//         en: "Warning",
//         ar: "تحذير",
//       };
//     case AnnouncementSeveritiesEnum[2]:
//       return {
//         en: "Critical",
//         ar: "حرج",
//       };
//     default:
//       return {
//         en: "Unknown",
//         ar: "غير معروف",
//       };
//   }
// }
