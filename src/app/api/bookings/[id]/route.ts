import { NextResponse } from "next/server";
import type { StoredBooking } from "@/types";
import { updateBooking } from "@/lib/server/store";
import { getSession } from "@/lib/server/session";

const ALLOWED_KEYS: (keyof StoredBooking)[] = ["status", "rating"];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let patch: Partial<StoredBooking>;
  try {
    patch = (await request.json()) as Partial<StoredBooking>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const safe: Partial<StoredBooking> = {};
  for (const key of ALLOWED_KEYS) {
    if (patch[key] !== undefined) {
      (safe as Record<string, unknown>)[key] = patch[key];
    }
  }

  const booking = updateBooking(session.userId, id, safe);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
