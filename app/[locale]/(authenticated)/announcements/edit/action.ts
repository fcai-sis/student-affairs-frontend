"use server";
export default async function updateAnnouncementAction(
  _: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData.entries());

  console.log("RAW FORM DATA: ", rawFormData);

  // remove Next.js $ACTION fields
  const cleanedFormData = Object.fromEntries(
    Object.entries(rawFormData).filter(([key, _]) => !key.includes("$ACTION"))
  );

  console.log("CLEANED FORM DATA: ", cleanedFormData);
  // supposed to get the id from the form fields
  const response = await fetch(`http://127.0.0.1:3003/${cleanedFormData._id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...cleanedFormData,
      _id: undefined,
      department: String(cleanedFormData.department).split(","),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("UPDATE ANNOUNCEMENT RES: ", data);

  if (response.status !== 201) {
    return { error: data.error };
  }
  return {
    success: true,
    data: data,
  };
}

export async function fetchAnnouncement(id: string) {
  console.log("Fetching Announcement", id);

  const response = await fetch(`http://127.0.0.1:3003/${id}`);

  const data = await response.json();
  console.log("Fetched Announcement", data);

  return data.announcement;
}
