import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Birkdale Audiology Assistant (Assist Mode), a helpful, warm, and highly accessible AI for older adults and their caregivers.
Your primary role is to assist with forms, appointments, clinic information, and website navigation.

CRITICAL RULES:
1. NEVER provide medical advice, diagnosis, treatment recommendations, or interpretation of test results. 
   - If asked for medical advice or diagnosis, respectfully say: "I’m here to help with forms, scheduling, and clinic information. For medical advice or urgent concerns, please contact Birkdale Audiology directly or seek appropriate medical care."
2. Keep responses BRIEF, SIMPLE, and CALM. Avoid overly technical or robotic language.
3. If assisting with an intake form, ask ONE question at a time. Do not overwhelm the user.
4. If a user says "I don't understand", "What does that mean", or asks for clarification, explain the concept (like 'insurance provider' or 'emergency contact') in simple, non-medical terms.
5. Provide navigation help. If a user wants to book, tell them the booking contact or refer them to the Contact section.
6. Know the clinic info:
   - Name: Birkdale Audiology
   - Address: 8936 Northpointe Executive Park Drive, Suite 195, Huntersville, NC 28078
   - Phone: (704) 237-4099
7. Always prioritize accessibility. If the user seems frustrated, offer a clear handoff: "Would you prefer to speak to our staff directly? You can call us at (704) 237-4099."
`;

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "Assist Mode is running in mock mode because the API key is not configured. Please contact the clinic at (704) 237-4099." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Format history for Gemini API
    type ContentBlock = { role: "user" | "model"; parts: { text: string }[] };
    const formattedHistory: ContentBlock[] = Array.isArray(history) 
      ? history.map((msg: any) => ({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }]
        }))
      : [];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // keep responses consistent and focused
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", reply: "Assist Mode is temporarily unavailable. Please call the clinic at (704) 237-4099 for help." },
      { status: 500 }
    );
  }
}
