import { geminiAI } from "@/app/AI/gemini";
import { downloadImages } from "@/services/extractPDF";
import fs from "fs/promises";
import path from "path";
import { summaryPrompt } from "@/app/AI/prompt";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

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
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const formData = await req.formData();
    const id = formData.get("id");

    if (!id || typeof id !== "string") {
      return new Response("No valid id provided", { status: 400 });
    }

    const docs = await prisma.documents.findMany({
      where: { id },
      select: {
        id: true,
        pageCount: true,
        publicId: true,
      },
    });

    if (!docs.length) {
      return new Response("Document not found", { status: 404 });
    }

    const publicId = docs[0].publicId;
    const imagepaths = [];

    for (let i = 1; i <= docs[0].pageCount; i++) {
      imagepaths.push(
        `https://res.cloudinary.com/dom61f3n8/image/upload/pg_${i}/v1745048591/${publicId}.jpg`
      );
    }

    const images = await downloadImages(imagepaths);
    const receiptData = await scanReceipts(images, summaryPrompt);
    return Response.json(receiptData, { status: 200 });
  } catch (error) {
    console.error("Error scanning receipt:", error);
    return new Response("Error scanning receipt", { status: 500 });
  }
}
