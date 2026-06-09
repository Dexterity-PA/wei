"use client";

import { useId, useRef, useState } from "react";
import { roleOptions, type Role } from "@/components/contact/content";

type Field = "name" | "email" | "role" | "school" | "message";
type FieldErrors = Partial<Record<Field, string>>;

type Submitted = {
  name: string;
  email: string;
  role: Role;
  school: string;
  message: string;
};

type ContactFormProps = {
  /** Selected role, owned by the parent so the path cards can drive it. */
  role: Role;
  onRoleChange: (role: Role) => void;
  /** Helper line shown above the fields, tailored to the chosen path. */
  intro: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roleLabels: Record<Role, string> = {
  student: "Student",
  educator: "School or educator",
  other: "Something else",
};

// Light client mirror of the server checks, for fast feedback only. The server
// is the source of truth.
function clientValidate(values: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) errors.email = "Please add an email so we can reply.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Please check that email address.";
  if (!values.message.trim()) errors.message = "Please add a short message.";
  else if (values.message.trim().length < 10)
    errors.message = "Please add a little more detail.";
  return errors;
}

export function ContactForm({ role, onRoleChange, intro }: ContactFormProps) {
  const baseId = useId();
  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot. Hidden from people, left blank by them.
  const [company, setCompany] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  const errorSummaryRef = useRef<HTMLParagraphElement | null>(null);

  function describedBy(field: Field): string | undefined {
    return errors[field] ? errorId(field) : undefined;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const local = clientValidate({ name, email, message });
    if (Object.keys(local).length > 0) {
      setErrors(local);
      setStatus("error");
      setFormError("Please fix the highlighted fields and send again.");
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, school, message, company }),
      });
      const result = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string; fieldErrors?: FieldErrors }
        | null;

      if (res.ok && result?.ok) {
        setSubmitted({
          name: name.trim(),
          email: email.trim(),
          role,
          school: school.trim(),
          message: message.trim(),
        });
        setStatus("idle");
        return;
      }

      if (result?.fieldErrors) setErrors(result.fieldErrors);
      setStatus("error");
      setFormError(
        result?.error ??
          "We could not send your message right now. Please try again in a little while.",
      );
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    } catch {
      setStatus("error");
      setFormError(
        "We could not send your message right now. Please check your connection and try again.",
      );
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  }

  if (submitted) {
    return (
      <div
        className="border border-wei-line border-l-2 border-l-wei-emerald bg-wei-paper-dim p-7 sm:p-9"
        role="status"
      >
        <h3 className="font-wei-display text-wei-2xl font-semibold text-wei-ink">
          Thanks, {submitted.name.split(" ")[0] || "there"}.
        </h3>
        <p className="mt-3 text-wei-base text-wei-ink/80">
          Your message is on its way to the WEI team and someone will follow up
          by email. Here is what you sent:
        </p>
        <dl className="mt-6 grid gap-3 border-t border-wei-line pt-6 text-wei-sm">
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <dt className="font-semibold text-wei-ink/60">You are a</dt>
            <dd className="text-wei-ink">{roleLabels[submitted.role]}</dd>
          </div>
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <dt className="font-semibold text-wei-ink/60">Name</dt>
            <dd className="text-wei-ink">{submitted.name}</dd>
          </div>
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <dt className="font-semibold text-wei-ink/60">Email</dt>
            <dd className="break-words text-wei-ink">{submitted.email}</dd>
          </div>
          {submitted.school ? (
            <div className="grid grid-cols-[7rem_1fr] gap-3">
              <dt className="font-semibold text-wei-ink/60">School</dt>
              <dd className="text-wei-ink">{submitted.school}</dd>
            </div>
          ) : null}
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <dt className="font-semibold text-wei-ink/60">Message</dt>
            <dd className="whitespace-pre-wrap text-wei-ink">{submitted.message}</dd>
          </div>
        </dl>
      </div>
    );
  }

  const labelClass = "block text-wei-sm font-semibold text-wei-ink";
  const inputClass =
    "mt-2 block w-full rounded-wei-sm border border-wei-line bg-wei-paper px-4 py-3 text-wei-base text-wei-ink outline-none transition-colors placeholder:text-wei-ink/40 focus-visible:border-wei-emerald-deep aria-[invalid=true]:border-wei-amber";
  const fieldErrorClass = "mt-2 text-wei-sm text-wei-emerald-deep";

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {formError ? (
        <p
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-wei-md border border-wei-amber/60 bg-wei-amber/10 px-4 py-3 text-wei-sm text-wei-ink"
        >
          {formError}
        </p>
      ) : null}

      <div>
        <label htmlFor={fieldId("name")} className={labelClass}>
          Name
        </label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
          className={inputClass}
        />
        {errors.name ? (
          <p id={errorId("name")} className={fieldErrorClass}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("email")} className={labelClass}>
          Email
        </label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
          className={inputClass}
        />
        {errors.email ? (
          <p id={errorId("email")} className={fieldErrorClass}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("role")} className={labelClass}>
          You are a
        </label>
        <select
          id={fieldId("role")}
          name="role"
          value={role}
          onChange={(e) => onRoleChange(e.target.value as Role)}
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={describedBy("role")}
          className={inputClass}
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.role ? (
          <p id={errorId("role")} className={fieldErrorClass}>
            {errors.role}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("school")} className={labelClass}>
          School{" "}
          <span className="font-normal text-wei-ink/50">(optional)</span>
        </label>
        <input
          id={fieldId("school")}
          name="school"
          type="text"
          autoComplete="organization"
          maxLength={120}
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          aria-invalid={errors.school ? true : undefined}
          aria-describedby={describedBy("school")}
          className={inputClass}
        />
        {errors.school ? (
          <p id={errorId("school")} className={fieldErrorClass}>
            {errors.school}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className={labelClass}>
          Message
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={5}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          className={`${inputClass} resize-y`}
        />
        {errors.message ? (
          <p id={errorId("message")} className={fieldErrorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: visually hidden and off the tab order. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <p className="text-wei-xs text-wei-ink/55">{intro}</p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-wei-pill bg-wei-emerald-deep px-7 py-3 text-wei-sm font-semibold text-wei-paper transition-colors hover:bg-wei-emerald focus-visible:bg-wei-emerald disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <p aria-live="polite" className="sr-only">
        {status === "sending" ? "Sending your message." : ""}
      </p>
    </form>
  );
}
