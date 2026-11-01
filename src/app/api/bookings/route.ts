import { NextResponse } from "next/server";
import type { StoredBooking } from "@/types";
import { createBooking, listBookingsForUser } from "@/lib/server/store";
import { getSession } from "@/lib/server/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookings = listBookingsForUser(session.userId);
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let booking: StoredBooking;
  try {
    booking = (await request.json()) as StoredBooking;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!booking.serviceId || !booking.reference || !booking.date) {
    return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 });
  }

  const saved = createBooking(session.userId, booking);
  return NextResponse.json({ booking: saved }, { status: 201 });
}
