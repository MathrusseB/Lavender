import { redirect } from "next/navigation";
import { Inquire } from "@/components/sections/Inquire";
import { isMobile } from "@/lib/device";

export default function InquirePage() {
  if (isMobile()) redirect("/#inquire");
  return <Inquire />;
}
