"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import CircularGallery from "@/components/CircularGallery";
// import CircularGallery from './CircularGallery'

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  const items = [
      {
        image: `https://picsum.photos/seed/1/800/600?grayscale`,
        text: "Bridge",
      },
      {
        image: `https://picsum.photos/seed/2/800/600?grayscale`,
        text: "dusk Setup",
      },
      {
        image: `https://picsum.photos/seed/2/800/600?grayscale`,
        text: "lol Setup",
      },
      {
        image: `https://picsum.photos/seed/2/800/600?grayscale`,
        text: "Desk Setup",
      },
    ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans">
      <h1 className="text-4xl font-bold mb-8">Welcome to TryHard</h1>
      <div className="w-full max-w-4xl mx-auto mb-8 h-60">
        <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} items={items} />
      </div>
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
    </main>
  );
}
