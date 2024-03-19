"use server";

export default async function dummyEndpoint(delay: number): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}

export async function commitSession() {
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/commit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);

  // coolcool just send the data or the error if one occurs
  return null;
}

export async function precommitRegistrationSession() {
  const response = await fetch(
    `${process.env.STUDENT_REGISTRATION_API}/precommit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    const error = await response.json();
    console.error(error);
    return { success: false, errors: error.errors };
  }

  return { success: true, data: await response.json() };
}
