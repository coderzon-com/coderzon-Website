import { redirect } from "next/navigation";

/** Signed-out visitors never reach this — proxy.ts sends them to /login. */
export default function RootPage() {
  redirect("/dashboard/messages");
}
