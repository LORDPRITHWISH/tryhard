import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
