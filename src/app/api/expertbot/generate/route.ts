import { prisma } from "@/lib/db";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: botId } = params;
  const { messages } = await req.json();

  try {
    const bot = await prisma.expertBot.findUnique({
      where: {
        id: botId,
      },
      select: {
        name: true,
        avatar: true,
        systemPrompt: true,
      },
    });
    if (!bot) {
      return new Response("Bot not found", { status: 404 });
    }

    const result = streamText({
      model: google("gemini-1.5-pro"),
      messages,
      system: bot.systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat response:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
