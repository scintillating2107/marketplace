import { NextResponse } from "next/server";
import { registerUser } from "@/lib/server/store";
import { createSession } from "@/lib/server/session";

export async function POST(request: Request) {
  let body: { email?: string; password?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim();
  const password = body.password ?? "";
  const name = body.name?.trim() ?? "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const result = registerUser(email, password, name);
  if (result === "exists") {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  await createSession({
    userId: result.id,
    email: result.email,
    name: result.name,
  });

  return NextResponse.json({
    user: { id: result.id, email: result.email, name: result.name },
  });
}
