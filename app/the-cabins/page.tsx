import { notFound, redirect } from "next/navigation";
import { Cabins } from "@/components/sections/Cabins";
import { siteConfig } from "@/lib/config";
import { isMobile } from "@/lib/device";

export default function TheCabinsPage() {
  if (!siteConfig.cabinsEnabled) notFound();
  if (isMobile()) redirect("/#the-cabins");
  return <Cabins />;
}
