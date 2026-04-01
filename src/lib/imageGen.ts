import { GoogleGenAI } from "@google/genai";

export async function generateHospitalImage(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional, high-end, luxurious medical facility architecture, specifically for ${prompt}. Focus on modern hospital building exterior or clean clinical interior. Cinematic lighting, architectural photography, 8k resolution, clean and sophisticated medical environment. ABSOLUTELY NO TEXT, NO LETTERS, NO NUMBERS, NO HOSPITAL NAME, NO SIGNAGE, NO WRITING ON WALLS, NO LOGOS. NO NATURAL LANDSCAPES unless it's a small garden within the hospital grounds. Use a soft, premium color palette. Ensure it looks like a real hospital or clinic.`,
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
    // Use a more specific hospital-related fallback from Unsplash
    return `https://images.unsplash.com/photo-1586773860418-d374a551f393?auto=format&fit=crop&q=80&w=800&h=600&q=80&sig=${encodeURIComponent(prompt)}`;
  }
}
