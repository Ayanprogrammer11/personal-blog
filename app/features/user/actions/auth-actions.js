"use server";

import { signOut } from "@/app/_lib/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
