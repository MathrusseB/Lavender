import { PageTurn } from "@/components/PageTurn";
import { FieldNotes } from "@/components/sections/FieldNotes";

export default function FieldNotesPage() {
  return (
    <>
      <FieldNotes />
      <PageTurn currentKey="notes" />
    </>
  );
}
