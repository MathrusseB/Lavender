"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { chapterNumeral } from "@/lib/chapters";
import { SectionHead } from "@/components/SectionHead";

type StepKey = "name" | "from" | "intent" | "email" | "notes";

type Step = {
  key: StepKey;
  label: string;
  before: string;
  after: string;
  kind: "text" | "email" | "select" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  options?: string[];
  minWidth?: string;
  required?: boolean;
};

const STEPS: Step[] = [
  {
    key: "name",
    label: "Name",
    before: "My name is ",
    after: ",",
    kind: "text",
    placeholder: "your name",
    autoComplete: "name",
    required: true,
  },
  {
    key: "from",
    label: "From",
    before: "I\u2019m writing from ",
    after: ",",
    kind: "text",
    placeholder: "city, state",
    autoComplete: "address-level2",
  },
  {
    key: "intent",
    label: "Hoping for",
    before: "and I\u2019m hoping for ",
    after: ".",
    kind: "select",
    options: [
      "an equine stay",
      "a family gathering",
      "a private retreat",
      "a seasonal visit",
      "something else",
    ],
  },
  {
    key: "email",
    label: "Email",
    before: "You can reach me at ",
    after: ".",
    kind: "email",
    placeholder: "name@elsewhere.com",
    autoComplete: "email",
    required: true,
  },
  {
    key: "notes",
    label: "Notes",
    before: "A few more words, if it\u2019s useful: ",
    after: "",
    kind: "textarea",
    placeholder: "dates, group size, what you\u2019re hoping for",
    minWidth: "18ch",
  },
];

const ROMANS = ["I", "II", "III", "IV", "V"];

export function Inquire({ id = "inquire" }: { id?: string } = {}) {
  const formRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  const formIn = useReveal(formRef);
  const logoIn = useReveal(logoRef);

  const [letterStep, setLetterStep] = useState(0);
  const [letterAnswers, setLetterAnswers] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const current = STEPS[letterStep];
  const isLast = letterStep === STEPS.length - 1;
  const value = letterAnswers[current.key] ?? "";

  useEffect(() => {
    if (sent) return;
    const el = inputRef.current;
    if (!el) return;
    const id = window.setTimeout(() => el.focus({ preventScroll: true }), 50);
    return () => window.clearTimeout(id);
  }, [letterStep, sent]);

  useEffect(() => {
    if (current.kind !== "textarea") return;
    const el = inputRef.current;
    if (!(el instanceof HTMLTextAreaElement)) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, current.kind]);

  function updateValue(v: string) {
    setLetterAnswers((prev) => ({ ...prev, [current.key]: v }));
  }

  function goBack() {
    if (letterStep > 0) setLetterStep((s) => s - 1);
  }

  function goNext() {
    if (letterStep < STEPS.length - 1) setLetterStep((s) => s + 1);
  }

  function send() {
    setSent(true);
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: Post-launch — wire to form backend (Resend, Formspark, or Kleos inbox).
    // Include the honeypot below in server-side bot filtering.
    send();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    if (e.key !== "Enter") return;
    if (current.kind === "textarea" && e.shiftKey) return;
    e.preventDefault();
    if (isLast) send();
    else goNext();
  }

  const renderBlank = () => {
    const commonProps = {
      className: "blank",
      value,
      onKeyDown,
      "aria-label": current.label,
    } as const;

    if (current.kind === "select") {
      return (
        <select
          {...commonProps}
          ref={(el) => {
            inputRef.current = el;
          }}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => updateValue(e.target.value)}
        >
          <option value="">&mdash; select &mdash;</option>
          {current.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (current.kind === "textarea") {
      return (
        <textarea
          {...commonProps}
          ref={(el) => {
            inputRef.current = el;
          }}
          rows={1}
          placeholder={current.placeholder}
          style={current.minWidth ? { minWidth: current.minWidth } : undefined}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateValue(e.target.value)}
        />
      );
    }

    return (
      <input
        {...commonProps}
        ref={(el) => {
          inputRef.current = el;
        }}
        type={current.kind === "email" ? "email" : "text"}
        placeholder={current.placeholder}
        autoComplete={current.autoComplete}
        required={current.required}
        onChange={(e: ChangeEvent<HTMLInputElement>) => updateValue(e.target.value)}
      />
    );
  };

  return (
    <section
      className="section section--stone inquire"
      id={id}
      aria-label="Inquire"
    >
      <div className="inquire__grid">
        <div className="inquire__left">
          <SectionHead
            numeral={chapterNumeral("inquire")}
            eyebrow="Inquire"
          />

          <div ref={formRef} className={`letter${formIn ? " in" : ""}`}>
            {sent ? (
          <div className="letter__thanks" role="status" aria-live="polite">
            Thank you,{" "}
            <em>{(letterAnswers.name || "friend").trim()}</em>. We&rsquo;ve
            received the note, and will write you back.
            <small>A reply typically arrives within the week.</small>
          </div>
        ) : (
          <form
            className="letter__form"
            onSubmit={onFormSubmit}
            noValidate
          >
            <div className="letter__head">
              <h3 className="letter__hello">
                Hello, <em>and welcome.</em>
              </h3>
            </div>

            <div className="letter__sheet">
              <p className="letter__line">
                <span>{current.before}</span>
                {renderBlank()}
                <span>{current.after}</span>
              </p>
            </div>

            {/* Honeypot — hidden from humans, flagged on the server post-launch. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="letter__nav">
              <button
                type="button"
                className="letter__back"
                onClick={goBack}
                disabled={letterStep === 0}
              >
                &larr; Back
              </button>
              <div className="letter__step-counter" aria-label={`Step ${ROMANS[letterStep]} of V`}>
                {ROMANS[letterStep]} / V
              </div>
              {isLast ? (
                <button type="submit" className="letter__send">
                  Send the note
                </button>
              ) : (
                <button
                  type="button"
                  className="letter__next"
                  onClick={goNext}
                >
                  Continue &rarr;
                </button>
              )}
            </div>
          </form>
        )}
          </div>
        </div>

        <div className="inquire__right">
          <figure ref={logoRef} className={`inquire__logo${logoIn ? " in" : ""}`}>
            <Image
              src="/assets/chat-logo.png"
              alt="Lavender Family Ranch"
              width={520}
              height={520}
              priority={false}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
