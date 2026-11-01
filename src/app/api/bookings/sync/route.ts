import { NextResponse } from "next/server";
import type { StoredBooking } from "@/types";
import { createBooking } from "@/lib/server/store";
import { getSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { bookings?: StoredBooking[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const list = body.bookings ?? [];
  for (const booking of list) {
    if (booking?.id && booking.serviceId) {
      createBooking(session.userId, booking);
    }
  }

  return NextResponse.json({ synced: list.length });
}
