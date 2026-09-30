import Papa from "papaparse";
import type { BatchCurrency } from "@/data/batch-payments";


export interface BatchRow {
  name: string;
  email: string;
  amount: number;
  currency: BatchCurrency;
}

export interface ParsedBatch {
  rows: BatchRow[];
  totalAmount: number;
  currency: BatchCurrency;
}

export type BatchParseResult =
  | { ok: true; batch: ParsedBatch }
  | { ok: false; errors: string[] };

const REQUIRED_COLUMNS = ["name", "email", "amount", "currency"];
const CURRENCIES: BatchCurrency[] = ["USD", "EUR", "GBP"];
const MAX_RECIPIENTS = 1000;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; 
const MAX_ERRORS_SHOWN = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CSV_TEMPLATE =
  "Name,Email,Amount,Currency\nJohn Doe,john@example.com,100,USD\n";

function isBatchCurrency(value: string): value is BatchCurrency {
  return (CURRENCIES as string[]).includes(value);
}

function fail(errors: string[]): BatchParseResult {
  return { ok: false, errors };
}

export async function parseBatchCsv(file: File): Promise<BatchParseResult> {
  const fileErrors: string[] = [];
  if (!file.name.toLowerCase().endsWith(".csv")) {
    fileErrors.push("The file must be a .csv file.");
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    fileErrors.push("The file is larger than the 5MB limit.");
  }
  if (fileErrors.length > 0) return fail(fileErrors);

  const text = await file.text();
  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,

    transformHeader: (header) =>
      header.replace(/^\uFEFF/, "").trim().toLowerCase(),
  });

  if (result.errors.some((e) => e.type === "Quotes")) {
    return fail([
      "The file has an unclosed quotation mark. Check the CSV formatting.",
    ]);
  }

  
  const fields = result.meta.fields ?? [];
  const missing = REQUIRED_COLUMNS.filter((c) => !fields.includes(c));
  if (missing.length > 0) {
    const names = missing.map((c) => c.charAt(0).toUpperCase() + c.slice(1));
    return fail([
      `Missing required column(s): ${names.join(", ")}. Expected: Name, Email, Amount, Currency.`,
    ]);
  }

  const rawRows = result.data;
  if (rawRows.length === 0) return fail(["The file has no recipients."]);
  if (rawRows.length > MAX_RECIPIENTS) {
    return fail([
      `The file has ${rawRows.length} recipients. The maximum is 1,000 per batch.`,
    ]);
  }

  const rows: BatchRow[] = [];
  const rowErrors: string[] = [];

  rawRows.forEach((raw, index) => {
    const line = index + 2; 
    const name = (raw.name ?? "").trim();
    const email = (raw.email ?? "").trim();
    const rawAmount = (raw.amount ?? "").trim();
    const currency = (raw.currency ?? "").trim().toUpperCase();
    const amount = Number(rawAmount);

    const problems: string[] = [];
    if (!name) problems.push("name is empty");
    if (!EMAIL_PATTERN.test(email)) problems.push("email is not valid");
    if (rawAmount === "" || !Number.isFinite(amount) || amount <= 0) {
      problems.push("amount must be a positive number");
    }
    if (!isBatchCurrency(currency)) {
      problems.push("currency must be USD, EUR or GBP");
    }

    if (problems.length > 0 || !isBatchCurrency(currency)) {
      rowErrors.push(`Line ${line}: ${problems.join(", ")}.`);
      return; 
    }

    rows.push({ name, email, amount, currency });
  });

  if (rowErrors.length > 0) {
    const shown = rowErrors.slice(0, MAX_ERRORS_SHOWN);
    if (rowErrors.length > MAX_ERRORS_SHOWN) {
      shown.push(`...and ${rowErrors.length - MAX_ERRORS_SHOWN} more.`);
    }
    return fail(shown);
  }

  const currencies = Array.from(new Set(rows.map((r) => r.currency)));
  if (currencies.length > 1) {
    return fail([
      `All amounts must be in the same currency. This file contains: ${currencies.join(", ")}.`,
    ]);
  }

  const totalAmount =
    Math.round(rows.reduce((sum, r) => sum + r.amount, 0) * 100) / 100;

  return { ok: true, batch: { rows, totalAmount, currency: currencies[0] } };
}