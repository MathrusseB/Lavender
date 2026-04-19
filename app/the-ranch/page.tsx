import { PageTurn } from "@/components/PageTurn";
import { Ranch } from "@/components/sections/Ranch";

export default function TheRanchPage() {
  return (
    <>
      <Ranch />
      <PageTurn currentKey="ranch" />
    </>
  );
}
