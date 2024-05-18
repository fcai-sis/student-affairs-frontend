"use server";
export default async function createAnnouncementAction(
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

  const response = await fetch(`http://127.0.0.1:3003`, {
    method: "POST",
    body: JSON.stringify({
      ...cleanedFormData,
      department: String(cleanedFormData.department).split(","),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log("CREATE ANNOUNCEMENT RES: ", data);

  if (response.status !== 201) {
    return { error: data.error };
  }
  return {
    success: true,
    data: data,
  };
}
