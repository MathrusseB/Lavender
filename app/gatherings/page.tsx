import { PageTurn } from "@/components/PageTurn";
import { Gatherings } from "@/components/sections/Gatherings";

export default function GatheringsPage() {
  return (
    <>
      <Gatherings />
      <PageTurn currentKey="gatherings" />
    </>
  );
}
