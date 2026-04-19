import { redirect } from "next/navigation";
import { Ranch } from "@/components/sections/Ranch";
import { isMobile } from "@/lib/device";

export default function TheRanchPage() {
  if (isMobile()) redirect("/#the-ranch");
  return <Ranch />;
}
