import { Hero } from "@/components/sections/Hero";
import { Ranch } from "@/components/sections/Ranch";
import { Barn } from "@/components/sections/Barn";
import { GateInterlude } from "@/components/sections/GateInterlude";
import { Cabins } from "@/components/sections/Cabins";
import { Gatherings } from "@/components/sections/Gatherings";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { Inquire } from "@/components/sections/Inquire";
import { siteConfig } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Hero id="top" />
      <Ranch id="ranch" />
      <Barn id="barn" />
      <GateInterlude id="gate" />
      {siteConfig.cabinsEnabled && <Cabins id="cabins" />}
      <Gatherings id="gatherings" />
      <FieldNotes id="notes" />
      <Inquire id="inquire" />
    </>
  );
}
