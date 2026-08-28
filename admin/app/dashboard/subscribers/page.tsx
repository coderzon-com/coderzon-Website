import type { Metadata } from "next";
import { SubscribersView } from "@/components/subscribers-view";
import { readInitialParams, type SearchParams } from "@/lib/types";

export const metadata: Metadata = { title: "Subscribers · Coderzon Admin" };

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Awaited: search params are asynchronous from Next 15 onward.
  const initialParams = await readInitialParams(searchParams);
  return <SubscribersView initialParams={initialParams} />;
}
