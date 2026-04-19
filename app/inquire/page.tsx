import { PageTurn } from "@/components/PageTurn";
import { Inquire } from "@/components/sections/Inquire";

export default function InquirePage() {
  return (
    <>
      <Inquire />
      <PageTurn currentKey="inquire" />
    </>
  );
}
