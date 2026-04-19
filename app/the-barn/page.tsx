import { redirect } from "next/navigation";
import { Barn } from "@/components/sections/Barn";
import { GateInterlude } from "@/components/sections/GateInterlude";
import { isMobile } from "@/lib/device";

export default function TheBarnPage() {
  if (isMobile()) redirect("/#the-barn");
  return (
    <>
      <Barn />
      <GateInterlude />
    </>
  );
}
