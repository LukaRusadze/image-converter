"use server";

import sharp from "sharp";

export async function convertImagesToPNG(files: FileList) {
  const images = await Promise.all(
    Array.from(files).map(async (file) => {
      const buffer = await file.arrayBuffer();
      const image = sharp(Buffer.from(buffer));
      const png = await image.png().toBuffer();
      return {
        fileName: file.name.replace(/\.[^/.]+$/, ".png"),
        data: `data:image/png;base64,${png.toString("base64")}`,
      };
    })
  );

  return images;
}
