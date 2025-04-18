import { fromPath } from "pdf2pic"
import fs from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const options = {
  density: 100,
  saveFilename: "page",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600
}

export async function extractPDF(pdfBuffer: Buffer): Promise<string[]> {
  const tempDir = "./temp"
  const tempFilename = `${uuidv4()}.pdf`
  const tempPath = path.join(tempDir, tempFilename)

  try {
    // Ensure temp directory exists
    await fs.mkdir(tempDir, { recursive: true })
    // Save buffer to disk temporarily
    await fs.writeFile(tempPath, pdfBuffer)

    const convert = fromPath(tempPath, options)
    const result = await convert.bulk(-1, { responseType: "image" })

    console.log(`${result.length} pages converted.`)
    return result.map(r => r.path).filter((path): path is string => path !== undefined)
  } catch (error) {
    console.error("Error:", error)
    throw error
  } finally {
    // Optional: delete the temp PDF file
    await fs.unlink(tempPath).catch(() => {})
  }
}
