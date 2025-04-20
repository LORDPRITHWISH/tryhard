import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { geminiAI } from "@/app/AI/gemini";

export async function downloadImages(imageUrls: string[]): Promise<string[]> {
  const tempDir = "./public/temp";
  await fs.mkdir(tempDir, { recursive: true });

  const downloadedPaths: string[] = [];

  for (const url of imageUrls) {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const extension = path.extname(new URL(url).pathname) || ".jpg";
      const filename = `${uuidv4()}${extension}`;
      const filePath = path.join(tempDir, filename);

      await fs.writeFile(filePath, response.data);
      downloadedPaths.push(filePath);
    } catch (err) {
      console.error(`Failed to download image from ${url}:`, err);
    }
  }

  console.log(`${downloadedPaths.length} images downloaded.`);
  return downloadedPaths;
}

export const fetchPDFBuffer = async (pdfUrl: string): Promise<Buffer> => {
  const response = await axios.get(pdfUrl, {
    responseType: "arraybuffer",
  });
  return Buffer.from(response.data, "binary");
};

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
      const data = JSON.parse(cleanedText);
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