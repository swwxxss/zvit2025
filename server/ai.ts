import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateTattooImage(prompt: string): Promise<string> {
  try {
    const enhancedPrompt = `Create a detailed tattoo design of: ${prompt}. Make it artistic and suitable for a tattoo.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    if (!response.data[0].url) {
      throw new Error("Failed to generate image");
    }

    return response.data[0].url;
  } catch (error: any) {
    console.error('Error generating image:', error);
    throw new Error(error.message);
  }
}