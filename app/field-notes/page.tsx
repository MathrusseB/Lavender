import { redirect } from "next/navigation";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { isMobile } from "@/lib/device";

export default function FieldNotesPage() {
  if (isMobile()) redirect("/#field-notes");
  return <FieldNotes />;
}
