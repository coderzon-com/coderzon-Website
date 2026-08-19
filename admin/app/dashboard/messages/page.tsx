import type { Metadata } from "next";
import { MessagesView } from "@/components/messages-view";
import { readInitialParams, type SearchParams } from "@/lib/types";

export const metadata: Metadata = { title: "Messages · Coderzon Admin" };

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Awaited: search params are asynchronous from Next 15 onward.
  const initialParams = await readInitialParams(searchParams);
  return <MessagesView initialParams={initialParams} />;
}
