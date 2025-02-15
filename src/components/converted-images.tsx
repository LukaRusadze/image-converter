"use client";

import { ImageResponse } from "@/contexts/image-contexts";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import JSZip from "jszip";
import { Download } from "lucide-react";

export function ConvertedImages({ files }: { files: ImageResponse[] }) {
  async function onClick() {
    if (files.length === 1) {
      const a = document.createElement("a");
      a.href = files[0].path;
      a.download = files[0].fileName;
      a.click();
      return;
    }

    const zip = new JSZip();
    await Promise.all(
      files.map((file) => {
        return fetch(file.path)
          .then((res) => res.blob())
          .then((blob) => {
            zip.file(file.fileName, blob);
          });
      })
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = "converted-images.zip";
      a.click();
    });
  }

  if (!files.length) {
    return null;
  }

  return (
    <Card className="max-w-5xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">Converted Images</h2>
      </CardHeader>
      <CardContent className="overflow-scroll mb-4 w-full flex-row flex gap-4">
        {files.map(ConvertedImage)}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="font-medium">Thanks for using our service!</p>
        <Button onClick={onClick}>Download All</Button>
      </CardFooter>
    </Card>
  );
}

function ConvertedImage(file: ImageResponse, index: number) {
  function onClick() {
    const a = document.createElement("a");
    a.href = file.path;
    a.download = file.fileName;
    a.click();
  }

  return (
    <div
      key={index}
      className="group shrink-0 flex flex-col items-center rounded-xl overflow-hidden relative h-64 aspect-[9/16]"
    >
      <div className="absolute group-hover:opacity-100 opacity-0 transition-opacity w-full h-full items-center z-10 p-2 flex justify-center">
        <div className="bg-black opacity-50 absolute w-full h-full" />
        <div className="z-10 flex items-center justify-center flex-col gap-4">
          <p className="text-white font-mono">{file.fileName}</p>
          <Button
            onClick={onClick}
            variant="secondary"
            size="icon"
            className="hover:cursor-pointer"
          >
            <Download />
          </Button>
        </div>
      </div>
      <Image
        src={file.path}
        alt={file.fileName}
        objectFit="cover"
        layout="fill"
        className="rounded-lg object-cover"
      />
    </div>
  );
}
