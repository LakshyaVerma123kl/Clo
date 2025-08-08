// src/app/api/quotes/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    );

    // Instead of parsing JSON directly, get text
    const raw = await res.text();

    // Clean up broken escape characters and fix quotes
    const cleaned = raw
      .replace(/\\'/g, "'") // fix escaped single quotes
      .replace(/\\n/g, " ") // remove line breaks
      .replace(/\\"/g, '"'); // fix escaped double quotes

    const data = JSON.parse(cleaned);

    const quote = {
      id: "quote-1",
      title: "Inspiration",
      type: "quote",
      content: `${data.quoteText} — ${data.quoteAuthor || "Unknown"}`,
    };

    return NextResponse.json([quote]);
  } catch (error) {
    console.error("Forismatic API error:", error);
    return NextResponse.json(
      [
        {
          id: "quote-1",
          title: "Fallback",
          type: "quote",
          content:
            "You're braver than you believe, stronger than you seem, and smarter than you think. — A.A. Milne",
        },
      ],
      { status: 200 }
    );
  }
}
