
import React, { useState, useCallback } from 'react';
import { UploadCloud } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (files: FileList | null) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileChange(e.dataTransfer.files);
    }
  }, [onFileChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${isDragging ? 'border-cyan-400 bg-gray-700/50' : 'border-gray-600 hover:border-cyan-500'} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <input
        type="file"
        multiple
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={disabled}
        accept=".js,.jsx,.ts,.tsx,.py,.java,.cs,.cpp,.c,.go,.rs,.rb,.php,.html,.css,.scss,.json,.md"
      />
      <div className="flex flex-col items-center">
        <UploadCloud className={`h-12 w-12 mb-4 ${isDragging ? 'text-cyan-400' : 'text-gray-500'}`} />
        <p className="font-semibold text-gray-300">
          <span className="text-cyan-400">Click to upload</span> or drag and drop files here
        </p>
        <p className="text-xs text-gray-500 mt-2">Any source code files are supported</p>
      </div>
    </div>
  );
};
