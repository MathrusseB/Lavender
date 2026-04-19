import { redirect } from "next/navigation";
import { Gatherings } from "@/components/sections/Gatherings";
import { isMobile } from "@/lib/device";

export default function GatheringsPage() {
  if (isMobile()) redirect("/#gatherings");
  return <Gatherings />;
}
