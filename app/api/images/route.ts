import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { message } = await req.json();
  const prompt = `Generate an appetizing and realistic image that visually represents the following recipe: ${message}. The image should showcase the final dish, highlighting its key ingredients and presentation.`;
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json",
    });

    return new Response(JSON.stringify(response.data[0].b64_json));
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate image' }), { status: 500 });
  }
}
