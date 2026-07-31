"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiPhoto,
  HiArrowDownTray,
  HiCheckCircle,
} from "react-icons/hi2";

export default function ImageWebpConverterPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setOriginalSize(file.size);
    setPreviewUrl(URL.createObjectURL(file));
    setWebpUrl(null);
    setConvertedSize(0);
  };

  const convertToWebp = () => {
    if (!selectedFile || !previewUrl) return;

    setIsConverting(true);
    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setConvertedSize(blob.size);
            setWebpUrl(URL.createObjectURL(blob));
          }
          setIsConverting(false);
        },
        "image/webp",
        0.85 // 85% WebP quality
      );
    };
  };

  return (
    <main className="min-h-screen bg-[#090503] text-white py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Link href="/tools" className="hover:text-[#ff6b00]">
              Tools Hub
            </Link>
            <span>/</span>
            <span className="text-white">Image to WebP Converter</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/30 text-[#ff6b00] text-xs font-bold uppercase tracking-wider">
            <HiPhoto size={16} />
            <span>CORE WEB VITALS SPEED TOOL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            PNG / JPG to WebP Image Converter
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Convert PNG &amp; JPG images to compressed WebP format natively in your browser with zero quality loss and 100% data privacy.
          </p>
        </div>

        {/* Converter Panel */}
        <div className="max-w-3xl bg-[#120904] rounded-3xl border border-white/10 p-6 md:p-8 space-y-6">
          <div className="border-2 border-dashed border-white/20 hover:border-[#ff6b00] rounded-2xl p-8 text-center transition-colors cursor-pointer relative bg-white/5">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <HiPhoto size={48} className="mx-auto text-[#ff6b00] mb-3" />
            <p className="text-sm font-bold text-white">
              {selectedFile ? selectedFile.name : "Click or drag & drop PNG/JPG image here"}
            </p>
            <p className="text-xs text-white/50 mt-1">
              Supports PNG, JPG, JPEG up to 10MB
            </p>
          </div>

          {selectedFile && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between text-xs text-white/80 gap-2">
                <span>Original File Size: <strong>{(originalSize / 1024).toFixed(1)} KB</strong></span>
                <button
                  onClick={convertToWebp}
                  disabled={isConverting}
                  className="bg-[#ff6b00] hover:bg-[#e05e00] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isConverting ? "Converting to WebP..." : "Convert to WebP →"}
                </button>
              </div>

              {webpUrl && (
                <div className="p-5 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <HiCheckCircle size={18} />
                      <span>Converted Successfully!</span>
                    </div>
                    <a
                      href={webpUrl}
                      download={`converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.webp`}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-md"
                    >
                      <HiArrowDownTray size={14} />
                      <span>Download WebP</span>
                    </a>
                  </div>

                  <div className="text-xs text-emerald-300">
                    New WebP Size: <strong>{(convertedSize / 1024).toFixed(1)} KB</strong> (Saved {(((originalSize - convertedSize) / originalSize) * 100).toFixed(0)}% bandwidth!)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
