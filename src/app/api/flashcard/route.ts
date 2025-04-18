import { extractPDF } from "@/services/extractPDF";
import { flashcardPrompt } from "@/app/AI/prompt";
import { NextRequest } from "next/server";
import { scanReceipts } from "../summary/route";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file provided", { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const images = await extractPDF(buffer);
    const receiptData = await scanReceipts(images, flashcardPrompt);
    return Response.json(receiptData, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return new Response("Error scanning receipt", { status: 500 });
  }
}
