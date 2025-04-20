import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const bot = await prisma.expertBot.findUnique({
    where: { id: params.id },
  });

  if (!bot)
    return NextResponse.json({ error: "Bot not found" }, { status: 404 });

  return NextResponse.json(bot);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const updatedBot = await prisma.expertBot.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updatedBot);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.expertBot.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
