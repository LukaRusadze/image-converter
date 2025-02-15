"use client";

import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";
import { convertImagesToPNG } from "@/actions/images";
import { useImage } from "@/contexts/image-contexts";

export function FileDropper() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setFiles } = useImage();

  function onClick(event: React.MouseEvent) {
    event.preventDefault();
    inputRef.current?.click();
  }

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const pngs = await convertImagesToPNG(files);
    setFiles((state) => [...state, ...pngs]);
  }

  return (
    <section className="max-w-2xl mx-auto mb-16">
      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-white">
        <Upload className="mx-auto mb-4 text-blue-500" size={48} />
        <p className="text-lg mb-4">Drag and drop your image file here</p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <Button className="hover:cursor-pointer" onClick={onClick}>
          Choose File
        </Button>

        <input
          multiple
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={onChange}
          ref={inputRef}
          className="hidden"
        />
      </div>
    </section>
  );
}
