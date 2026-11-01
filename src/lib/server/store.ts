import "server-only";

import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import type { StoredBooking } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "servora-db.json");

export interface DbUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
}

export interface DbBooking extends StoredBooking {
  userId: string;
}

interface Database {
  users: DbUser[];
  bookings: DbBooking[];
}

function ensureDb(): Database {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    const demoHash = bcrypt.hashSync("demo123", 10);
    const initial: Database = {
      users: [
        {
          id: "user-demo",
          email: "demo@servora.app",
          passwordHash: demoHash,
          name: "Demo User",
        },
      ],
      bookings: [],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }

  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as Database;
}

function writeDb(db: Database): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export function findUserByEmail(email: string): DbUser | undefined {
  const db = ensureDb();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): DbUser | undefined {
  const db = ensureDb();
  return db.users.find((u) => u.id === id);
}

export function verifyPassword(user: DbUser, password: string): boolean {
  return bcrypt.compareSync(password, user.passwordHash);
}

export function listBookingsForUser(userId: string): StoredBooking[] {
  const db = ensureDb();
  return db.bookings
    .filter((b) => b.userId === userId)
    .map(({ userId: _uid, ...booking }) => booking)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createBooking(userId: string, booking: StoredBooking): StoredBooking {
  const db = ensureDb();
  const record: DbBooking = { ...booking, userId };
  const existing = db.bookings.findIndex((b) => b.id === booking.id && b.userId === userId);
  if (existing >= 0) {
    db.bookings[existing] = record;
  } else {
    db.bookings.unshift(record);
  }
  writeDb(db);
  return booking;
}

export function updateBooking(
  userId: string,
  bookingId: string,
  patch: Partial<StoredBooking>
): StoredBooking | null {
  const db = ensureDb();
  const idx = db.bookings.findIndex((b) => b.id === bookingId && b.userId === userId);
  if (idx < 0) return null;
  const updated = { ...db.bookings[idx], ...patch };
  db.bookings[idx] = updated;
  writeDb(db);
  const { userId: _uid, ...booking } = updated;
  return booking;
}

export function registerUser(email: string, password: string, name: string): DbUser | "exists" {
  const db = ensureDb();
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return "exists";
  }
  const user: DbUser = {
    id: randomUUID(),
    email: email.toLowerCase(),
    passwordHash: bcrypt.hashSync(password, 10),
    name: name.trim() || email.split("@")[0],
  };
  db.users.push(user);
  writeDb(db);
  return user;
}
