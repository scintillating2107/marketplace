import type { StoredBooking } from "@/types";
import { createBookingApi } from "@/lib/api-client";
import { loadBookings, saveBookings } from "@/lib/booking";

export async function saveBookingForUser(
  booking: StoredBooking,
  isLoggedIn: boolean
): Promise<void> {
  if (isLoggedIn) {
    await createBookingApi(booking);
    return;
  }
  const all = loadBookings();
  saveBookings([booking, ...all]);
}

export async function loadBookingsForUser(isLoggedIn: boolean): Promise<StoredBooking[]> {
  if (isLoggedIn) {
    const { fetchBookingsApi } = await import("@/lib/api-client");
    return fetchBookingsApi();
  }
  return loadBookings();
}
