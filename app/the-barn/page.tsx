import { PageTurn } from "@/components/PageTurn";
import { Barn } from "@/components/sections/Barn";

export default function TheBarnPage() {
  return (
    <>
      <Barn />
      <PageTurn currentKey="barn" />
    </>
  );
}
