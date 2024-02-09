import Navbar from "@/components/Navbar";
import RegisterButtons from "@/components/RegisterButtons";
import { getI18n, getScopedI18n } from "@/locales/server";

export default async function Home() {
  const t = await getI18n();
  const scopedT = await getScopedI18n("hello");
  return (
    <div>
      <Navbar />
      <RegisterButtons />
    </div>
  );
}
