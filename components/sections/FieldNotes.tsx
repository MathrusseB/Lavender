"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { chapterNumeral } from "@/lib/chapters";
import { getFieldNotes, type FieldNote } from "@/lib/cms";
import { SectionHead } from "@/components/SectionHead";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} · ${d.getUTCFullYear()}`;
}

export function FieldNotes({ id = "notes" }: { id?: string } = {}) {
  const notesRef = useRef<HTMLDivElement>(null);
  const notesIn = useReveal(notesRef);

  const notes: FieldNote[] = getFieldNotes();

  return (
    <section
      className="section section--warm"
      id={id}
      aria-label="Field Notes"
    >
      <SectionHead
        numeral={chapterNumeral("notes")}
        eyebrow="Field Notes"
        title={
          <>
            Letters from
            <br />
            the ranch, <em>sent</em>
            <br />
            occasionally.
          </>
        }
        dek="Brief observations from the grounds. Weather, animals, the state of the maples, who passed through."
      />

      <div ref={notesRef} className={`notes${notesIn ? " in" : ""}`}>
        <aside className="notes__aside">
          <p className="notes__prompt">
            We keep a small record. Leave a note if you&rsquo;d like the next
            one.
          </p>
          {/* TODO: Post-launch — wire to email service Kleos uses (Buttondown, Kit, etc). */}
          <form
            className="notes__capture"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="notes__capture-label" htmlFor="notes-email">
              Your email
            </label>
            <input
              id="notes-email"
              className="notes__capture-input"
              type="email"
              autoComplete="email"
              placeholder="name@elsewhere.com"
            />
          </form>
        </aside>

        <div className="note-list">
          {notes.map((note) => (
            <a key={note.slug} className="note" href="#">
              <span className="note__date">{formatDate(note.date)}</span>
              <h3
                className="note__title"
                dangerouslySetInnerHTML={{ __html: note.title }}
              />
              <span className="note__read">Read &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
