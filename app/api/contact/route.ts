import { NextResponse } from "next/server";

/**
 * Contact / get-involved form delivery.
 *
 * Submissions are emailed to the WEI inbox through Resend's REST API. We call
 * the API directly with fetch so the route adds no package dependency. The key
 * is read from RESEND_API_KEY at request time and is never exposed to the
 * client. All validation happens here on the server; the client mirrors a
 * lighter version only for fast feedback.
 */

// Where submissions are delivered.
const DELIVER_TO = "praneeth.a2027@gmail.com";

// Sandbox sender. Swap for a verified domain sender once DNS is set up.
const FROM = "WEI Get Involved <onboarding@resend.dev>";

const ROLES = ["student", "educator", "other"] as const;
type Role = (typeof ROLES)[number];

type Field = "name" | "email" | "role" | "school" | "message";

type Payload = {
  name: string;
  email: string;
  role: string;
  school: string;
  message: string;
  // Honeypot. Real people leave it blank; bots tend to fill every field.
  company?: string;
};

// Pragmatic email shape check. Server-side gate, not a deliverability promise.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 80,
  email: 120,
  school: 120,
  message: 2000,
} as const;

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(body: Record<string, unknown>): {
  data?: Payload;
  fieldErrors?: Partial<Record<Field, string>>;
} {
  const fieldErrors: Partial<Record<Field, string>> = {};

  const name = asString(body.name);
  const email = asString(body.email);
  const role = asString(body.role);
  const school = asString(body.school);
  const message = asString(body.message);
  const company = asString(body.company);

  if (!name) fieldErrors.name = "Please tell us your name.";
  else if (name.length > LIMITS.name) fieldErrors.name = "That name is a little too long.";

  if (!email) fieldErrors.email = "Please add an email so we can reply.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    fieldErrors.email = "Please check that email address.";

  if (!role) fieldErrors.role = "Please pick the option that fits you best.";
  else if (!ROLES.includes(role as Role))
    fieldErrors.role = "Please pick the option that fits you best.";

  if (school.length > LIMITS.school) fieldErrors.school = "That school name is a little too long.";

  if (!message) fieldErrors.message = "Please add a short message.";
  else if (message.length < 10)
    fieldErrors.message = "Please add a little more detail.";
  else if (message.length > LIMITS.message)
    fieldErrors.message = "Please keep the message under 2000 characters.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  return {
    data: { name, email, role: role as Role, school, message, company },
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function roleLabel(role: string): string {
  if (role === "student") return "Student";
  if (role === "educator") return "School or educator";
  return "Other";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that submission. Please try again." },
      { status: 400 },
    );
  }

  const { data, fieldErrors } = validate(body);
  if (!data) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please fix the highlighted fields and send again.",
        fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped. Pretend success so bots learn nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration, not user error. Stay non-technical for the visitor and
    // log clearly for whoever is running the site.
    console.error("RESEND_API_KEY is not set; contact form cannot deliver mail.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message right now. Please try again in a little while.",
      },
      { status: 503 },
    );
  }

  const school = data.school || "Not provided";
  const subject = `Get involved: ${roleLabel(data.role)} from ${data.name}`;

  const text = [
    `Role: ${roleLabel(data.role)}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `School: ${school}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0b1f1c;">
      <h2 style="margin: 0 0 16px;">New get-involved message</h2>
      <p style="margin: 0 0 4px;"><strong>Role:</strong> ${escapeHtml(roleLabel(data.role))}</p>
      <p style="margin: 0 0 4px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p style="margin: 0 0 4px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p style="margin: 0 0 16px;"><strong>School:</strong> ${escapeHtml(school)}</p>
      <p style="margin: 0 0 4px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [DELIVER_TO],
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend delivery failed:", res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send your message right now. Please try again in a little while.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Resend request threw:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message right now. Please try again in a little while.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
