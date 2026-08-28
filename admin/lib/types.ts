/** Row shapes returned by the listing endpoints. */
export type MessageRow = {
  id: string;
  name: string;
  email: string;
  country: string;
  message: string;
  subject: string | null;
  company: string | null;
  createdAt: string;
};

export type QuoteRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  message: string;
  createdAt: string;
};

/* Two columns, because that is genuinely all a mailing-list signup is: an
   address and the day it arrived. */
export type SubscriberRow = {
  id: string;
  email: string;
  createdAt: string;
};

/** Next 16 hands pages their search params asynchronously. */
export type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

/** Read one value, ignoring the repeated-key array form. */
function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

/** Turn raw search params into the state the list starts from. */
export async function readInitialParams(searchParams: SearchParams) {
  const params = await searchParams;
  return { q: one(params.q) };
}
