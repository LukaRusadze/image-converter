"use server";

import { ImageResponse } from "@/contexts/image-contexts";
import path from "path";
import sharp from "sharp";

export async function convertImagesToPNG(
  prevState: ImageResponse[],
  files: FileList
) {
  const images = await Promise.all(
    Array.from(files).map(async (file) => {
      const buffer = await file.arrayBuffer();
      const image = sharp(Buffer.from(buffer));
      const fileName = file.name.replace(/\.[^/.]+$/, ".jpeg");
      const filePath = path.join(process.cwd(), "public", "images", fileName);

      await image.toFile(filePath);

      return {
        fileName: fileName,
        path: `/images/${fileName}`,
      };
    })
  );

  return [...prevState, ...images];
}
