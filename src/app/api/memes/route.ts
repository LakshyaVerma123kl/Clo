// app/api/memes/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
    const data = await res.json();

    return NextResponse.json({
      id: String(data.id),
      type: "meme",
      title: "Funny Line",
      content: data.joke,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch meme joke" },
      { status: 500 }
    );
  }
}
