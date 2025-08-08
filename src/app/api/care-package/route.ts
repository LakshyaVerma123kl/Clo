// app/api/memes/route.ts
import { NextResponse } from "next/server";

const fallbackItems = [
  {
    id: "2",
    title: "Sweet Note",
    type: "note",
    content:
      "You're absolutely crushing it out there! I'm so proud of how brave and amazing you are. 💕",
  },
  {
    id: "3",
    title: "Study Tip",
    type: "tip",
    content:
      "Remember: Take breaks every 45 minutes, hydrate, and don't forget to eat! Your brain needs fuel! 🧠",
  },
  {
    id: "4",
    title: "Virtual Hug",
    type: "hug",
    content: "*Sending you the biggest, warmest hug across all the miles* 🤗💕",
  },
  {
    id: "5",
    title: "Motivation Boost",
    type: "note",
    content:
      "Every challenge you face there is making you stronger and more amazing. You've got this! 💪✨",
  },
  {
    id: "6",
    title: "Funny Reminder",
    type: "meme",
    content:
      "🤔 Fun fact: Distance is just a number, but my feelings for you are infinite!",
  },
];

export async function GET() {
  try {
    const res = await fetch(
      "https://v2.jokeapi.dev/joke/Any?type=single&amount=2"
    );
    const data = await res.json();

    const jokes = Array.isArray(data.jokes) ? data.jokes : [data];

    const jokeItems = jokes.map((joke: any, index: number) => ({
      id: `joke-${joke.id || index}`,
      title: "Funny Line",
      type: "meme",
      content: joke.joke,
    }));

    const combined = [...jokeItems, ...fallbackItems];

    return NextResponse.json(combined);
  } catch (err) {
    return NextResponse.json([...fallbackItems], { status: 200 });
  }
}
