"use client";
import React, { useEffect, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import CircularGallery from "@/components/CircularGallery";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [worldName, setWorldName] = useState<string>("");
  const [worldLoading, setWorldLoading] = useState<boolean>(true);
  const [worlds, setWorlds] = useState<any[]>([]);

  const getAllWorlds = async () => {
    try {
      const response = await axios.get("/api/world", { withCredentials: true });
      setWorlds(response.data.formattedDocuments);
      setWorldLoading(false);
    } catch (error) {
      toast.error("something went wrong while getting the worlds");
      setWorldLoading(false);
    }
  };
  useEffect(() => {
    getAllWorlds();
  }, []);

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("worldName", worldName);
    formData.append("file", file);

    try {
      setUploading(true);
      const upload = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(" Uploaded:", upload.data);
      toast.success("Upload successful!");
      setTimeout(() => {
        router.push(`/onboarding/${upload.data.data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };


  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-sans">
      <h1 className="text-4xl font-bold mb-8">Welcome to TryHard</h1>
      <div className="relative w-full max-w-4xl mx-auto mb-8 h-60">
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 100%)",
          }}
        />
        <CircularGallery
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          items={worlds}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col gap-4 py-4">
        <div>
          <Label htmlFor="worldName">World Name</Label>
        </div>
        <Input
          id="worldName"
          value={worldName}
          onChange={(e) => setWorldName(e.target.value)}
          placeholder="Enter world name"
          className="mb-4"
        />
        <FileUpload onChange={(files: File[]) => setFile(files[0] || null)} />
        <button
          onClick={handleFileUpload}
          disabled={!file || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded rounded-xl hover:bg-blue-700 disabled:bg-gray-500"
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>
    </main>
  );
}
