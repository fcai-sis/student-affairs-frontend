"use server";
export async function fetchAnnouncements() {
  const response = await fetch(
    `http://127.0.0.1:3003?page=1&pageSize=10`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  const announcementsData = await response.json();

  const announcements = announcementsData.announcements;
  // console.log("Announcements", announcements);

  if (response.status === 200) {
    return announcements;
  } else if (response.status == 400) {
    return announcementsData.error;
  }

  return null;
}
