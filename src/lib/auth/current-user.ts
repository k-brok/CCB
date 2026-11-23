
import { cookies } from "next/headers";

import { getAuthenticatedUser } from "@/lib/auth/session";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("ccb_session")?.value;

  return getAuthenticatedUser(sessionToken);
}
