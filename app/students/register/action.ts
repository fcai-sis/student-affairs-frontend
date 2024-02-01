"use server";

export default async function uploadFileAction(prevState: any, formData: FormData) {
  // make POST request to express server  at localhost:3001/start
  // with the file as the body of the request, content-type: multipart/form-data
  console.log(formData);

  const response = await fetch("http://localhost:3001/start", {
    method: "POST",
    body: formData,
  });

  // get the response as JSON
  const data = await response.json();

  console.log(data);

  return data;
}
