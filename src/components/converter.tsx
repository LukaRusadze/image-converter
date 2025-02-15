"use client";
import { useActionState } from "react";
import { ConvertedImages } from "./converted-images";
import { FileDropper } from "./file-dropper";
import { convertImagesToPNG } from "@/actions/images";
import { Loader2 } from "lucide-react";

export function Converter() {
  const [files, convert, isPending] = useActionState(convertImagesToPNG, []);

  return (
    <>
      <FileDropper convert={convert} />

      <section className="flex items-center max-w-xl justify-center mb-8">
        {!isPending ? (
          <ConvertedImages files={files} />
        ) : (
          <Loader2 className="animate-spin" size={64} />
        )}
      </section>
    </>
  );
}
