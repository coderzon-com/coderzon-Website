import { redirect } from "next/navigation";

/** The dashboard opens on the messages list. */
export default function DashboardPage() {
  redirect("/dashboard/messages");
}
