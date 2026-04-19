import { Hero } from "@/components/sections/Hero";
import { Ranch } from "@/components/sections/Ranch";
import { Barn } from "@/components/sections/Barn";
import { GateInterlude } from "@/components/sections/GateInterlude";
import { Cabins } from "@/components/sections/Cabins";
import { Gatherings } from "@/components/sections/Gatherings";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { Inquire } from "@/components/sections/Inquire";
import { PageTurn } from "@/components/PageTurn";
import { siteConfig } from "@/lib/config";
import { isMobile } from "@/lib/device";

export default function Home() {
  if (!isMobile()) {
    return (
      <>
        <Hero />
        <PageTurn currentKey="hero" />
      </>
    );
  }

  return (
    <>
      <Hero id="top" />
      <Ranch id="the-ranch" />
      <Barn id="the-barn" />
      <GateInterlude id="gate" />
      {siteConfig.cabinsEnabled && <Cabins id="the-cabins" />}
      <Gatherings id="gatherings" />
      <FieldNotes id="field-notes" />
      <Inquire id="inquire" />
    </>
  );
}
