import { notFound } from "next/navigation";
import { Cabins } from "@/components/sections/Cabins";
import { siteConfig } from "@/lib/config";

export default function TheCabinsPage() {
  if (!siteConfig.cabinsEnabled) notFound();
  return <Cabins />;
}
