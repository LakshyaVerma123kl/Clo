// app/api/quotes/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        "X-Api-Key": process.env.API_NINJAS_KEY || "", // ✅ use env for security
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch quote" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data); // returns an array like [{ quote, author, category }]
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
