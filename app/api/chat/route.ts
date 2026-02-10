import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

export const runtime = 'edge';

const SYSTEM_INSTRUCTION = `
You are the "AssetLift Analyst" for AssetLiftLending.com.
Your goal is to help real estate investors analyze potential deals and understand loan programs.

LOAN PARAMETERS:
- Fix & Flip: Max 92.5% LTC, 75% LTV, 100% Rehab funding.
- Ground-Up: Max 90% LTC, 70% LTARV.
- DSCR Rental: Max 80% LTV, 30-yr fixed, 1.2+ DSCR preferred.

TONE & STYLE:
- Professional, efficient, and data-driven.
- Keep responses short and punchy.
- CRITICAL: DO NOT USE BOLDING OR DOUBLE ASTERISKS (**). Output strictly in plain text.

CONVERSATION FLOW & CONTACT CAPTURE:
1. When a user provides deal details or asks for funding specifics, you MUST politely ask for their email address. Example: "I can run these numbers for you. Could I also get your email address so a specialist can send a formal term sheet?"
2. If the user replies without providing an email (ignores or declines), you MUST continue with the analysis immediately. Do not block the user.
3. In the follow-up response (if email was not provided), politely ask for a cell number instead. Example: "No problem at all. If you'd prefer, you can leave a cell number for a quick text follow-up instead?"
4. Always prioritize answering the user's question. The contact info is a secondary request to help them get funded.

DEAL SUMMARY:
If the user provides deal numbers (PP, Rehab, ARV), ALWAYS provide a "DEAL SUMMARY" with:
  1. Estimated Loan Amount
  2. Required Equity (Down Payment)
  3. Recommended Program
  4. Max Leverage (LTC/LTV)
`;

export async function POST(req: NextRequest) {
  try {
    const { chatHistory } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: 'Gemini API Key missing' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: chatHistory.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Connection error. Please contact info@assetliftlending.com.";

    const sources: any[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());

    return Response.json({ text, sources: uniqueSources });
  } catch (error: any) {
    console.error("Gemini Edge Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
