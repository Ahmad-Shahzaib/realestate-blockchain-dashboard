"use client";
import React, { useRef } from "react";

export interface KYCFileUploadProps {
  onFilesSelected: (files: FileList) => void;
}

export const KYCFileUpload: React.FC<KYCFileUploadProps> = ({ onFilesSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    console.log("Upload area clicked");
    inputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-blue-400 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      <svg className="w-12 h-12 text-blue-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v-4a4 4 0 018 0v4M12 12v8m0 0H8m4 0h4" />
      </svg>
      <p className="text-blue-500 font-semibold">Drag & drop your KYC documents here, or <span className="underline">browse</span></p>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={e => e.target.files && onFilesSelected(e.target.files)}
        accept="image/*,application/pdf"
      />
    </div>
  );
};
