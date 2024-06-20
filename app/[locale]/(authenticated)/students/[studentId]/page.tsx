export default async function Page({
  params: { studentId },
}: Readonly<{ params: { locale: string; studentId: string } }>) {
  return (
    <>
      <h1>Student details</h1>
      <div>{studentId}</div>
    </>
  );
}
