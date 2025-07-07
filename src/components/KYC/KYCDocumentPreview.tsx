import React from "react";

export interface KYCDocumentPreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const KYCDocumentPreview: React.FC<KYCDocumentPreviewProps> = ({ files, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {files.map((file, idx) => (
        <div key={idx} className="relative border rounded-lg p-4 bg-white dark:bg-gray-900 shadow">
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-full h-40 object-contain rounded mb-2"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7v10a2 2 0 002 2h6a2 2 0 002-2V7M7 7h10M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>
              <span className="text-gray-500 text-xs">{file.name}</span>
            </div>
          )}
          <button
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            onClick={() => onRemove(idx)}
            title="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
