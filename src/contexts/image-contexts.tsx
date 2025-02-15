"use client";
import { createContext, useContext, useState } from "react";

export type ImageResponse = {
  fileName: string;
  data: string;
};

const ImageContext = createContext<{
  files: ImageResponse[];
  setFiles: React.Dispatch<React.SetStateAction<ImageResponse[]>>;
}>({
  files: [],
  setFiles: () => {},
});

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<ImageResponse[]>([]);

  return (
    <ImageContext.Provider value={{ files, setFiles }}>
      {children}
    </ImageContext.Provider>
  );
}

export const useImage = () => useContext(ImageContext);
