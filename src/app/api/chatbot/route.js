
import { NextResponse } from "next/server";
import { ai } from "@/ai/genkit";
import { z } from "zod";
import { knowledgeBase } from "@/lib/chatbot-knowledge-base";

const ChatbotInputSchema = z.object({
  message: z.string(),
});

const ChatbotResponseSchema = z.object({
  reply: z.string(),
});

const chatbotPrompt = ai.definePrompt({
  name: "chatbotPrompt",
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotResponseSchema },
  prompt: `You are a helpful and friendly assistant for Paarsh Infotech.

  Use the following knowledge base as your primary source of truth to answer questions about the company.
  If the user asks a question that is not covered in the knowledge base, use your general knowledge to provide a helpful answer.
  
  Knowledge Base:
  """
  ${knowledgeBase}
  """
  
  User's question: "{{message}}"
  
  Your answer:`,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const { output } = await chatbotPrompt({ message });

    if (!output) {
      return NextResponse.json({ error: "Failed to get a response from the AI." }, { status: 500 });
    }

    return NextResponse.json({ reply: output.reply });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "An internal error occurred." }, { status: 500 });
  }
}
