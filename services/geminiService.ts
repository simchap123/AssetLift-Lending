import { Message, GeminiResult } from "@/lib/types";

export async function getGeminiResponse(chatHistory: Message[]): Promise<GeminiResult> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatHistory }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Server error');
    }

    return await response.json();
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return {
      text: "Connection issue. Please email info@assetliftlending.com for a quote or try again in a moment.",
      sources: []
    };
  }
}
