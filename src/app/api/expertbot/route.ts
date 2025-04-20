// app/api/expert-bot/route.ts
import { prisma } from "@/lib/db"; 
import { NextResponse } from "next/server";

export async function GET() {
  const bots = await prisma.expertBot.findMany();
  return NextResponse.json(bots);
}

export async function POST(req: Request) {
  const data = await req.json();

  const bot = await prisma.expertBot.create({
    data: {
      name: data.name,
      avatar: data.avatar,
      systemPrompt: data.systemPrompt,
      coarse: data.coarse,
    },
  });

  return NextResponse.json(bot, { status: 201 });
}
