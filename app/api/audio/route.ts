import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { message } = await req.json();
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "nova",  
      input: message,
      speed: 1.0,  
    });
    return new NextResponse(response.body);
  } catch (error) {
    console.error('Error generating audio:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to generate audio' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
