export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const name = locale === "en" ? "John" : "جون";

  return (
    <div>
      <h1>{name}</h1>
      <h1>HOME</h1>
    </div>
  );
}
