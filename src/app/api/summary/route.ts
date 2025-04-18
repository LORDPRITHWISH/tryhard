import { geminiAI } from "@/app/AI/gemini";
import { extractPDF } from "@/services/extractPDF";
import { NextRequest } from "next/server";
import fs from "fs/promises";
import path from "path";
import { summaryPrompt } from "@/app/AI/prompt";

interface Note {
  concepts: string[];
  formulas: string[];
  datesAndFacts: string[];
  summary: string[];
  memoryTips: string[];
}

export async function scanReceipts(files: string[], prompt: string) {
  try {
    const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = await Promise.all(
      files.map(async (file) => {
        try {
          const fileData = await fs.readFile(file);
          const ext = path.extname(file).toLowerCase().replace(".", "");
          const supported = ["jpg", "jpeg", "png", "webp"];

          if (!supported.includes(ext)) return null;

          const mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;
          return {
            inlineData: {
              data: fileData.toString("base64"),
              mimeType,
            },
          };
        } catch (err) {
          console.warn(`Skipping unreadable file: ${file}`, err);
          return null;
        }
      })
    );

    // Filter out any nulls
    const validImageParts = imageParts.filter((part) => part !== null);

    const result = await model.generateContent([
      ...validImageParts,
      { text: prompt },
    ]);

    const response = await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    console.log(cleanedText);

    try {
      const data: Note[] = JSON.parse(cleanedText);
      return data;
    } catch (parseError) {
      console.error("Error parsing JSON array response:", parseError);
      throw new Error("Invalid response format from Gemini");
    }
  } catch (error) {
    console.log(error);
    console.error("Error scanning receipts:", error);
    throw new Error("Failed to scan receipts");
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return new Response("No file provided", { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const images = await extractPDF(buffer);
    console.log(images);
    const receiptData = await scanReceipts(images, summaryPrompt);
    return Response.json(receiptData, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return new Response("Error scanning receipt", { status: 500 });
  }
}
