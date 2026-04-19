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

function NoteRow({ note }: { note: FieldNote }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isIn = useReveal(ref);
  return (
    <a
      ref={ref}
      className={`note${isIn ? " in" : ""}`}
      href="#"
    >
      <span className="note__date">{formatDate(note.date)}</span>
      <h3
        className="note__title"
        dangerouslySetInnerHTML={{ __html: note.title }}
      />
      <span className="note__read">Read &rarr;</span>
    </a>
  );
}

export function FieldNotes({ id = "notes" }: { id?: string } = {}) {
  const asideRef = useRef<HTMLElement>(null);
  const asideIn = useReveal(asideRef);

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

      <div className="notes">
        <aside
          ref={asideRef}
          className={`notes__aside${asideIn ? " in" : ""}`}
        >
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
            <NoteRow key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}
