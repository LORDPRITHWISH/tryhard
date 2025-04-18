import { extractPDF } from "@/services/extractPDF";
import { scanReceipts } from "../summary/route";
import { QNAPrompt } from "@/app/AI/prompt";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file provided", { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const images = await extractPDF(buffer);
    const receiptData = await scanReceipts(images, QNAPrompt);
    return Response.json(receiptData, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return new Response("Error scanning receipt", { status: 500 });
  }
}
