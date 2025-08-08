// app/api/quote/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();

    return NextResponse.json({
      content: data.content,
      author: data.author || "Anonymous",
    });
  } catch (error) {
    return NextResponse.json(
      {
        content: "You're amazing, and the universe knows it.",
        author: "Fallback Bot",
      },
      { status: 200 }
    );
  }
}
