"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function HomePage() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
    </main>
  );
}
