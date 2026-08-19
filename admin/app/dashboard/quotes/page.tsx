import type { Metadata } from "next";
import { QuotesView } from "@/components/quotes-view";
import { readInitialParams, type SearchParams } from "@/lib/types";

export const metadata: Metadata = { title: "Quotes · Coderzon Admin" };

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const initialParams = await readInitialParams(searchParams);
  return <QuotesView initialParams={initialParams} />;
}
