import { GoogleGenAI } from "@google/genai";

export async function generateHospitalImage(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional, high-end, luxurious medical facility architecture, specifically for ${prompt}. Focus on modern hospital building exterior or clean clinical interior. Cinematic lighting, architectural photography, 8k resolution, clean and sophisticated medical environment. ABSOLUTELY NO TEXT, NO LETTERS, NO NUMBERS, NO HOSPITAL NAME, NO SIGNAGE, NO WRITING ON WALLS, NO LOGOS. NO NATURAL LANDSCAPES unless it's a small garden within the hospital grounds. Use a soft, premium color palette.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation failed:", error);
    return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/800/600`;
  }
}
